import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface SuccessMessageProps {
  productName: string
  email: string
}

export function SuccessMessage({ productName, email }: SuccessMessageProps) {
  const [copied, setCopied] = useState(false)
  
  const copyableText = `Product name > ${productName}\nEmail > ${email}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyableText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="space-y-6" role="alert" aria-live="polite">
      {/* Success Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-orange-600 mb-2">
          Server is busy please visit...
        </h2>
      </div>

      {/* Server Construction Message */}
      <div className="text-center space-y-4">
        <p className="text-base text-gray-700">
          <a 
            href="https://astra.datastax.com/langflow/17731d9c-4bb7-4f2e-b603-1587c185f782/playground/8040dc26-1e6b-4036-bcf3-d236d428a1d7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            DataStax Langflow Playground
          </a>
        </p>
      </div>

      {/* Copyable Text Block */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">
          Please copy those details (click to copy):
        </p>
        
        <div 
          onClick={handleCopy}
          className="relative group cursor-pointer p-4 bg-white border border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <div className="font-mono text-sm text-gray-800 space-y-1">
            <div>Product name &gt; {productName}</div>
            <div>Email &gt; {email}</div>
          </div>
          
          {/* Copy Icon */}
          <div className="absolute top-3 right-3">
            {copied ? (
              <div className="flex items-center space-x-1 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-xs font-medium">Copied!</span>
              </div>
            ) : (
              <Copy className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
            )}
          </div>
        </div>
      </div>

      {/* Email Notification Message */}
      <div className="text-center">
        <p className="text-base text-gray-600">
          Send it on the chat then You will get the email after 20s
        </p>
      </div>
    </div>
  )
}