import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/')({
  component: () => <div>Hello /events/!</div>
})