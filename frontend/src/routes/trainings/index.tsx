import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/trainings/')({
  component: () => <div>Hello /trainings/!</div>
})