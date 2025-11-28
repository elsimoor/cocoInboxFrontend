import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useSecureNotes } from '../hooks/useSecureNotes';
import { NoteAlgo } from '../lib/notesCrypto';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Notes() {
  const { user, loading: authLoading } = useAuth();
  const { notes, loading, listVaultNotes, createNote, deleteNote, getNoteEncrypted, decryptTitle, decryptContent } = useSecureNotes();
  const [algo, setAlgo] = useState<NoteAlgo>('AES-GCM');
  const [vaultPassword, setVaultPassword] = useState('');
  const [vaultLoaded, setVaultLoaded] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [autoDelete, setAutoDelete] = useState(false);
  const [expiresMode, setExpiresMode] = useState<'none' | '1h' | '24h' | 'custom'>('1h');
  const [expiresAt, setExpiresAt] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [viewingContent, setViewingContent] = useState<string | null>(null);
  const [viewingTitle, setViewingTitle] = useState<string | null>(null);
  const [decryptedTitles, setDecryptedTitles] = useState<Record<string, string>>({});
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleCreate = async () => {
    if (!title || !content) return;

    setCreating(true);
    let expiresInMinutes: number | undefined;
    let expiresAtToSend: string | undefined;
    if (expiresMode === '1h') expiresInMinutes = 60;
    else if (expiresMode === '24h') expiresInMinutes = 24 * 60;
    else if (expiresMode === 'custom' && expiresAt) expiresAtToSend = expiresAt;

    await createNote(algo, vaultPassword, title, content, autoDelete, expiresAtToSend, expiresInMinutes);
    setTitle('');
    setContent('');
    setAutoDelete(false);
    setExpiresMode('1h');
    setExpiresAt('');
    setShowCreateForm(false);
    setCreating(false);
    if (vaultPassword) {
      const list = await listVaultNotes(algo, vaultPassword);
      const map: Record<string, string> = {};
      for (const n of list) {
        try { map[n.id] = await decryptTitle(n, vaultPassword); } catch {}
      }
      setDecryptedTitles(map);
    }
  };

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="Secure Notes">
      <div className="notes-page">
        <div className="header">
          <div>
            <h1>Secure Notes</h1>
            <p className="subtitle">Notes sécurisées — chiffrées côté client, accès par mot de passe et type de chiffrement</p>
          </div>
        </div>

        {!vaultLoaded && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Unlock Vault</CardTitle>
              <CardDescription>Secret notes are hidden. Enter password to reveal.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-full sm:w-auto min-w-[200px]">
                  <Select value={algo} onValueChange={(v) => setAlgo(v as NoteAlgo)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Crypto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AES-GCM">AES-GCM (AES-256)</SelectItem>
                      <SelectItem value="AES-CBC-HMAC">AES-CBC + HMAC-SHA256</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[220px]">
                  <Input type="password" placeholder="Vault password" value={vaultPassword} onChange={(e) => setVaultPassword(e.target.value)} />
                </div>
                <Button
                  disabled={!vaultPassword}
                  onClick={async () => {
                    const list = await listVaultNotes(algo, vaultPassword);
                    const map: Record<string, string> = {};
                    for (const n of list) {
                      try { map[n.id] = await decryptTitle(n, vaultPassword); } catch {}
                    }
                    setDecryptedTitles(map);
                    setVaultLoaded(true);
                  }}
                >Open Vault</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {vaultLoaded && (
          <div className="toolbar">
            <button onClick={() => setShowCreateForm(!showCreateForm)} className="create-btn">
              {showCreateForm ? 'Cancel' : 'Create Note'}
            </button>
            <div className="vault-meta">Crypto: {algo} · Decrypted with provided password</div>
            <button className="link-btn" onClick={() => { setVaultLoaded(false); setDecryptedTitles({}); }}>Lock</button>
          </div>
        )}

        {showCreateForm && vaultLoaded && (
          <Card className="mb-8">
            <CardContent className="pt-6 space-y-4">
              <Input placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="Note content (will be encrypted)" value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={autoDelete} onCheckedChange={(v) => setAutoDelete(!!v)} />
                  Auto-delete after first read
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Expires:</span>
                  <Select value={expiresMode} onValueChange={(v) => setExpiresMode(v as any)}>
                    <SelectTrigger className="w-[160px]"><SelectValue placeholder="Expiry" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No expiry</SelectItem>
                      <SelectItem value="1h">In 1 hour</SelectItem>
                      <SelectItem value="24h">In 24 hours</SelectItem>
                      <SelectItem value="custom">Custom date/time</SelectItem>
                    </SelectContent>
                  </Select>
                  {expiresMode === 'custom' && (
                    <Input type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className="w-[220px]" />
                  )}
                </div>
                <Button onClick={handleCreate} disabled={creating || !title || !content}>
                  {creating ? 'Creating…' : 'Create Note'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {vaultLoaded && loading ? (
          <div>Loading notes...</div>
        ) : vaultLoaded && notes.length === 0 ? (
          <div className="empty-state">
            <p>No secure notes yet. Create one to get started!</p>
          </div>
        ) : vaultLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{decryptedTitles[note.id] || '••••••'}</CardTitle>
                  <CardDescription>
                    <span className="text-xs text-muted-foreground">
                      Created: {new Date(note.created_at).toLocaleDateString()}
                      {note.expires_at ? ` · Expires: ${new Date(note.expires_at).toLocaleString()}` : ''}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-2">
                  <div className="space-x-2">
                    {note.auto_delete_after_read && <Badge className="bg-amber-100 text-amber-800">Auto-delete</Badge>}
                    {note.has_been_read && <Badge variant="secondary">Already read</Badge>}
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="secondary"
                      onClick={async () => {
                        const n = await getNoteEncrypted(note.id);
                        if (!n) {
                          alert('Note not available (it may be expired or deleted).');
                          return;
                        }
                        try {
                          const t = decryptedTitles[n.id] || (await decryptTitle(n, vaultPassword));
                          const c = await decryptContent(n, vaultPassword);
                          setViewingTitle(t);
                          setViewingContent(c);
                        } catch (e) {
                          alert('Failed to decrypt. Check password/algorithm.');
                        }
                      }}
                    >Open</Button>
                    <Button variant="destructive" onClick={() => deleteNote(note.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="vault-blur">
            <div className="blur-overlay" />
            <div className="blur-text">Secret notes are protected. Unlock the vault to view.</div>
          </div>
        )}

      <Dialog open={viewingContent !== null} onOpenChange={(o) => { if (!o) { setViewingContent(null); setViewingTitle(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewingTitle || 'Secure Note'}</DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap text-sm text-foreground max-h-[60vh] overflow-auto">{viewingContent || ''}</pre>
        </DialogContent>
      </Dialog>
      </div>

      <style jsx>{`
        .notes-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 20px;
        }
        h1 {
          font-size: 36px;
          color: #1e293b;
          margin: 0 0 8px 0;
        }
        .subtitle { color: #64748b; font-size: 16px; margin: 0; }
        .vault-gate { position: relative; background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 16px; }
        .blur-hint { filter: blur(3px); color: #475569; user-select: none; }
        .vault-form { display: flex; gap: 10px; align-items: center; margin-top: 12px; flex-wrap: wrap; }
        .select, .text-input { padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; }
        .toolbar { display: flex; gap: 10px; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .vault-meta { color: #64748b; }
        .create-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .create-btn:hover {
          background: #1d4ed8;
        }
        .create-form {
          background: white;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .title-input,
        .content-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
          margin-bottom: 16px;
          font-family: inherit;
        }
        .title-input:focus,
        .content-input:focus {
          outline: none;
          border-color: #2563eb;
        }
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .expiry { display: flex; align-items: center; gap: 8px; }
        .expiry-label { color: #334155; }
        .select, .date-input { padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #334155;
        }
        .checkbox-label input {
          width: auto;
          cursor: pointer;
        }
        .submit-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          background: #059669;
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
          background: white;
          border-radius: 12px;
        }
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .note-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        .note-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .note-card h3 {
          margin: 0 0 12px 0;
          color: #1e293b;
          font-size: 20px;
        }
        .badge {
          display: inline-block;
          background: #fef3c7;
          color: #92400e;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 12px;
          margin-right: 8px;
        }
        .badge.read {
          background: #dbeafe;
          color: #1e40af;
        }
        .note-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }
        .actions { display: flex; gap: 8px; align-items: center; }
        .created {
          color: #64748b;
          font-size: 14px;
        }
        .open-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .delete-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .delete-btn:hover {
          background: #dc2626;
        }
        .vault-blur { position: relative; height: 180px; background: #f8fafc; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .blur-overlay { position: absolute; inset: 0; backdrop-filter: blur(6px); }
        .blur-text { position: relative; color: #334155; font-weight: 600; }
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-content { background: white; border-radius: 12px; max-width: 800px; width: 100%; max-height: 80vh; overflow: hidden; display: flex; flex-direction: column; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; }
        .close { background: transparent; border: none; font-size: 24px; cursor: pointer; }
        .note-body { white-space: pre-wrap; padding: 16px; margin: 0; color: #0f172a; }
      `}</style>
    </Layout>
  );
}
