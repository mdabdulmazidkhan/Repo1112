import { useState } from 'react'
import { ProductRequestModal } from './components/ProductRequestModal'
import { Youtube, Github, MessageCircle } from 'lucide-react'

interface SubmittedData {
  productName: string
  email: string
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null)

  const handleOpenModal = () => {
    setIsModalOpen(true)
    setSubmissionStatus('idle')
    setSubmittedData(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSubmissionStatus('idle')
    setSubmittedData(null)
  }

  const handleFormSubmit = async (data: SubmittedData) => {
    setSubmissionStatus('submitting')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmittedData(data)
    setSubmissionStatus('success')
  }

  return (
    <div className="min-h-screen bg-[#fff8dc] relative">
      {/* Header Section */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="flex justify-between items-start p-6 md:p-8">
          {/* Brand Section - Top Left */}
          <div className="">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Shopzy
            </h1>
            <p className="text-sm md:text-base text-gray-700 mt-1 font-medium">
              Discover Smarter deals, Instantly!
            </p>
          </div>
          
          {/* Social Icons - Top Right */}
          <div className="flex space-x-4">
            <a
              href="https://www.youtube.com/watch?v=6ecTO22ulRM"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-red-600 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Visit YouTube"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/mdabdulmazidkhan/LangFlow-Projects-"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Visit GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://astra.datastax.com/langflow/17731d9c-4bb7-4f2e-b603-1587c185f782/playground/8040dc26-1e6b-4036-bcf3-d236d428a1d7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Open Chat"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <main className="text-center space-y-12 max-w-2xl mx-auto">
          {/* Main CTA Section */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Get Any Product Details
              <br />
              <span className="text-blue-700">Delivered to You Instantly</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-xl mx-auto">
              Simply tell us the product name, and we’ll find the best deals and coupons for you.
              Get all the details instantly on your email and save up to 50%!
            </p>
          </div>
          
          {/* CTA Button */}
          <button
            onClick={handleOpenModal}
            className="button"
          >
            <span>Get a product</span>
          </button>
        </main>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-center space-x-1 text-gray-600">
          <span className="text-sm font-medium">Created for</span>
          <div className="flex items-center px-2 py-0.5 bg-[#fff8dc] rounded-md mx-1">
            <img 
              src="/new-logo.png" 
              alt="Competition Logo" 
              className="h-5 w-auto"
            />
          </div>
          <span className="text-sm font-medium">Competition</span>
        </div>
      </footer>

      {/* Modal */}
      <ProductRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        submissionStatus={submissionStatus}
        submittedData={submittedData}
      />
    </div>
  )
}

export default App
