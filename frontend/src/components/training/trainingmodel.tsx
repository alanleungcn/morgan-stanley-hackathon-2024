import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  videoSrc: string
  tags: string[]
}

const TrainingModal = ({
  isOpen,
  onClose,
  title,
  description,
  videoSrc,
  tags,
}: ModalProps) => {
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const savedCompletionStatus = localStorage.getItem(`completed-${title}`)
    setIsCompleted(savedCompletionStatus === 'true')
  }, [title])

  const handleCompleteClick = () => {
    const newStatus = !isCompleted
    setIsCompleted(newStatus)
    localStorage.setItem(`completed-${title}`, newStatus.toString())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-6xl h-[90vh] p-0 rounded-lg flex flex-col'>
        <DialogHeader className='p-4'>
          <DialogTitle className='text-2xl font-semibold text-gray-800'>
            {title}
          </DialogTitle>
          <DialogDescription className='text-lg'>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className='relative flex-grow mb-2'>
          <iframe
            src={videoSrc}
            className='w-3/4 h-full mx-auto rounded-lg'
            title={title}
            allowFullScreen
          />
        </div>
        <div className='flex flex-wrap gap-2 mx-auto mb-2'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='px-3 py-1 text-yellow-800 bg-yellow-200 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>
        <div className='mx-auto'>
          <Button
            onClick={handleCompleteClick}
            className={`w-[90%] mb-3 ${
              isCompleted
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-yellow-600 hover:bg-yellow-700'
            } text-white py-2 px-4`}
          >
            {isCompleted ? 'Completed' : 'Complete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TrainingModal
