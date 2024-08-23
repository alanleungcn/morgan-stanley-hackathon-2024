import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/manage-events')({
  component: () => <div>Hello /admin/manage-events!</div>
})