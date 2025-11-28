import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../Components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useSecureFiles } from '../hooks/useSecureFiles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Badge } from '@/Components/ui/badge';

export default function Files() {
  const { user, loading: authLoading } = useAuth();
  const { files, loading, error, uploadFile, deleteFile, refetch } = useSecureFiles();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState<string>('');
  const [maxDownloads, setMaxDownloads] = useState<number | ''>('');
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    await uploadFile(selectedFile, {
      password,
      expiresAt: expiresAt || undefined,
      maxDownloads: typeof maxDownloads === 'number' ? maxDownloads : undefined,
      watermarkEnabled,
    });
    setSelectedFile(null);
    setUploading(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="Secure Files">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-foreground">Secure File Sharing</h1>
        <p className="text-muted-foreground mb-8 mt-2 text-lg">Upload encrypted files with password protection and watermarking</p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload a file</CardTitle>
            <CardDescription>Choose a file and protection options</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <label className="flex-1 min-w-[250px]">
              <input type="file" onChange={handleFileChange} className="hidden" id="file-input" />
              <span className="block cursor-pointer rounded-md border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground hover:border-primary">
                {selectedFile ? selectedFile.name : 'Choose a file'}
              </span>
            </label>
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="min-w-[200px]" />
            <Input type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className="min-w-[200px]" />
            <Input type="number" placeholder="Max downloads (optional)" value={maxDownloads as any} onChange={(e) => setMaxDownloads(e.target.value === '' ? '' : Number(e.target.value))} min={1} className="min-w-[200px]" />
            <label className="inline-flex items-center gap-2 text-sm text-foreground">
              <Checkbox checked={watermarkEnabled} onCheckedChange={(v) => setWatermarkEnabled(!!v)} />
              Watermark (images)
            </label>
            <Button onClick={handleUpload} disabled={!selectedFile || uploading || !password}>{uploading ? 'Uploading…' : 'Upload File'}</Button>
          </CardContent>
        </Card>

        {error && <div className="mb-3 text-sm text-destructive">{error}</div>}

        {loading ? (
          <div>Loading files...</div>
        ) : files.length === 0 ? (
          <div className="text-center p-12 text-muted-foreground bg-card rounded-xl">
            <p>No secure files yet. Upload one to get started!</p>
            <Button onClick={() => refetch()} className="mt-3">Refresh</Button>
          </div>
        ) : (
          <div className="grid gap-5">
            {files.map((file) => (
              <Card key={file.id} className="p-4">
                <div className="flex gap-4">
                  <div className="text-4xl">📁</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold break-all">{file.filename}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{formatFileSize(file.file_size)}</span>
                      {file.watermark_enabled && <Badge variant="secondary">Watermarked</Badge>}
                      {file.password_protected && <Badge variant="secondary">Password Protected</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      <span>Downloads: {file.download_count}</span>
                      {file.max_downloads && <span> / {file.max_downloads}</span>}
                      {file.expires_at && <span className="ml-3">Expires: {new Date(file.expires_at).toLocaleString()}</span>}
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="text-sm text-muted-foreground">{new Date(file.created_at).toLocaleDateString()}</span>
                      <div className="flex items-center gap-2">
                        <Button asChild variant="secondary"><a href={`/f/${file.id}`} target="_blank" rel="noreferrer">Open</a></Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            const url = `${window.location.origin}/f/${file.id}`;
                            navigator.clipboard.writeText(url);
                            alert('Share link copied to clipboard');
                          }}
                        >Copy Link</Button>
                        <Button variant="destructive" onClick={() => deleteFile(file.id)}>Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
