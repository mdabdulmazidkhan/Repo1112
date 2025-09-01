import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  productName: z.string().min(1, 'Product name cannot be empty'),
  email: z.string().email('Please enter a valid email address')
})

type FormData = z.infer<typeof formSchema>

interface RequestFormProps {
  onSubmit: (data: FormData) => Promise<void>
  isSubmitting: boolean
}

export function RequestForm({ onSubmit, isSubmitting }: RequestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur'
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Product Name Field */}
      <div className="space-y-2">
        <label 
          htmlFor="productName" 
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <input
          id="productName"
          type="text"
          {...register('productName')}
          className={`w-full px-4 py-3 bg-white border rounded-md text-base transition-colors focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-blue-600 ${
            errors.productName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter the product you want"
          disabled={isSubmitting}
        />
        {errors.productName && (
          <p className="text-sm text-red-600" role="alert">
            {errors.productName.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full px-4 py-3 bg-white border rounded-md text-base transition-colors focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-blue-600 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your@gmail.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="button modal-button"
        >
          <span>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </span>
        </button>
      </div>
    </form>
  )
}