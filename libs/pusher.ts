// import * as PusherTypes from 'pusher-js';

export const makePusher = async () => {
   const Pusher: any = (await import('pusher-js/with-encryption')).default
   const pusher = new Pusher('217fc189613d415738e9', {
      cluster: 'ap3'
    });

  const channel = pusher.subscribe("my-channel");
  return {pusher, channel}

}