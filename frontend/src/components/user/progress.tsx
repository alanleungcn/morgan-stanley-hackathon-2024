import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface Training {
  title: string
  videoSrc: string
}

const allTrainings: Training[] = [
  {
    title: 'Elderly Assistance',
    videoSrc: 'https://www.youtube.com/embed/-rB5-AkqpjQ',
  },
  {
    title: 'Food Distribution',
    videoSrc: 'https://www.youtube.com/embed/xDPL-_Op87o',
  },
  {
    title: 'Mental Health Support',
    videoSrc: 'https://www.youtube.com/embed/FgNRE44coVU',
  },
  {
    title: 'Youth Mentoring',
    videoSrc: 'https://www.youtube.com/embed/Uv8a6RiFZ2E',
  },
  {
    title: 'Disaster Response Training',
    videoSrc: 'https://www.youtube.com/embed/tjyJUlif5Lg',
  },
]

const useCompletedTrainings = () => {
  const [completedTrainings, setCompletedTrainings] = useState<Training[]>([])

  useEffect(() => {
    const fetchCompletedTrainings = () => {
      const completed = allTrainings.filter(training => {
        const completedStatus = localStorage.getItem(
          `completed-${training.title}`,
        )
        return completedStatus === 'true'
      })
      setCompletedTrainings(completed)
    }

    fetchCompletedTrainings()
  }, [])

  return completedTrainings
}

export const Progress = () => {
  const completedTrainings = useCompletedTrainings()

  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      <div className='grid grid-cols-2 gap-2 overflow-y-auto'>
        {completedTrainings.length > 0 ? (
          completedTrainings.map(training => (
            <div
              key={training.title}
              className='relative flex flex-col overflow-hidden bg-white rounded-lg shadow-md'
              style={{ height: '210px' }}
            >
              <iframe
                src={training.videoSrc}
                className='w-full h-32'
                title={training.title}
                allowFullScreen
              />
              <div className='flex-1 p-2'>
                <h2 className='text-lg font-semibold text-gray-800 truncate'>
                  {training.title}
                </h2>
              </div>
              <div className='absolute text-2xl text-green-500 bottom-4 right-4'>
                <CheckCircle />
              </div>
            </div>
          ))
        ) : (
          <p className='col-span-2 text-center text-gray-600'>
            No completed trainings yet.
          </p>
        )}
      </div>
    </div>
  )
}
