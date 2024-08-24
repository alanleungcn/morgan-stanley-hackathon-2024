import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TrainingModal from '@/components/training/trainingmodel'

type TrainingCardProps = {
  title: string
  description: string
  videoSrc: string
  tags: string[]
}

export const TrainingCard = ({
  title,
  description,
  videoSrc,
  tags,
}: TrainingCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Card
        className='flex flex-col overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg cursor-pointer lg:flex-row hover:shadow-xl'
        onClick={handleCardClick}
      >
        <CardHeader className='p-0 rounded-t-lg lg:w-1/3 lg:rounded-t-none lg:rounded-l-lg'>
          <iframe
            src={videoSrc}
            className='object-cover w-full h-48 rounded-t-lg lg:h-full lg:rounded-t-none lg:rounded-l-lg'
            title={title}
            allowFullScreen
            loading='lazy'
          />
        </CardHeader>
        <div className='flex flex-col lg:w-2/3'>
          <CardHeader className='p-4 bg-gray-100 rounded-t-lg lg:rounded-t-none lg:rounded-r-lg'>
            <CardTitle className='text-xl font-semibold text-gray-800'>
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1 p-4'>
            <p className='h-24 overflow-hidden text-gray-700 text-ellipsis'>
              {description}
            </p>
            <div className='flex flex-wrap gap-2 mt-4'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='px-3 py-1 text-yellow-800 bg-yellow-200 rounded-full'
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>

      <TrainingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={title}
        description={description}
        videoSrc={videoSrc}
        tags={tags}
      />
    </>
  )
}
