import { Input } from '../ui/input'
import { TrainingCard } from '../training/trainingcard'
// import { useTrainings } from "@/api/event/use-trainings";

export const ManageTrainings = () => {
  // const {  } = useTrainings();

  return (
    <div className='flex justify-center'>
      <div className='p-8 max-w-[1000px] w-full flex flex-col gap-8'>
        <h1 className='text-2xl font-bold'>Manage Events</h1>
        <div className='flex gap-8'>
          <Input placeholder='Search' />
        </div>

        <div>
          {/* {data?.map((e) => (
            <EventCard
              key={e.eventId}
              event={e}
              buttonText="Edit"
              buttonAction={() => {}}
              layout={layout}
            />
          ))} */}
          <TrainingCard
            description='asdfasdf'
            tags={['asdffsdf', 'afsdf']}
            title='asdfasdf'
            videoSrc='https://www.youtube.com/embed/xDPL-_Op87o'
            key={1}
          />
        </div>
      </div>
    </div>
  )
}
