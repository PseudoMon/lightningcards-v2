import MessageFlash from "./MessageFlash.svelte"

interface FlasherOptions {
  delay?: number;
}

export const flash = (message: string, options?: FlasherOptions) => {
  const delay = options?.delay

  const messageFlash = new MessageFlash({
    target: document.body,
    props: {
      message,
      delay,
    }
  })
}
