import type PusherT from 'pusher-js/with-encryption'

let pusher: PusherT | null = null
export const makePusher: () => Promise<PusherT> = async () => {
  const Pusher = (await import('pusher-js/with-encryption')).default
  pusher =
    pusher ??
    new Pusher('217fc189613d415738e9', {
      cluster: 'ap3',
    })
  return pusher
}
