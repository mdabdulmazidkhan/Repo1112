import { useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { RequestForm } from './RequestForm'
import { SuccessMessage } from './SuccessMessage'

interface SubmittedData {
  productName: string
  email: string
}

interface ProductRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SubmittedData) => Promise<void>
  submissionStatus: 'idle' | 'submitting' | 'success'
  submittedData: SubmittedData | null
}

export function ProductRequestModal({
  isOpen,
  onClose,
  onSubmit,
  submissionStatus,
  submittedData
}: ProductRequestModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay 
          className="fixed inset-0 bg-gray-900/70 backdrop-blur-md z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          onClick={onClose}
        />
        
        {/* Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-[#fff8dc] p-8 shadow-2xl rounded-xl border border-gray-300 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <Dialog.Close 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:pointer-events-none"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          {/* Modal Content */}
          {submissionStatus === 'success' && submittedData ? (
            <SuccessMessage 
              productName={submittedData.productName}
              email={submittedData.email}
            />
          ) : (
            <>
              <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
                Request a Product
              </Dialog.Title>
              
              <RequestForm 
                onSubmit={onSubmit}
                isSubmitting={submissionStatus === 'submitting'}
              />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}