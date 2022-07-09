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

  let onOutroEndRemover

  let outroEnd = new Promise(resolveOutro => {
    onOutroEndRemover = messageFlash.$on("outroEnd", () => {
      resolveOutro("resolved")
    })
  })

  outroEnd.then(() => {
    onOutroEndRemover()
    messageFlash.$destroy()
  })
}
