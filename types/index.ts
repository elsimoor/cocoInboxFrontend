export interface Attachment {
    filename: string
    size: number
    contentType: string
    cid?: string
    content?: string
  }
  
  export interface Message {
    uid?: number | string
    seqNo?: number
    flags?: string[]
    modseq?: any
    from: string
    to: string
    subject: string
    date: any
    text: string
    html?: string
    attachments?: Attachment[]
  }
  
  export interface Testimonial {
    quote: string
    name: string
    role: string
    initial: string
  }
  
  export interface FeatureCard {
    title: string
    description: string
    icon: React.ReactNode
    isFeatured?: boolean
  }
  
  export interface PricingPlan {
    name: string
    price: string
    tagline: string
    features: string[]
    buttonLabel: string
    isPopular?: boolean
  }