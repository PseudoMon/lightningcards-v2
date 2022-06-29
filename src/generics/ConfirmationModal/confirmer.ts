import ConfirmationModal from "./ConfirmationModalProm.svelte"

export const askForConfirmation = (
  message: string | undefined,
) => new Promise(resolve => {

  const confirmationModal = new ConfirmationModal({
    target: document.body,
    intro: true,
    props: {
      message,
    }
  })

  let onConfirmRemover
  let onCancelRemover
  let onOutroEndRemover

  let answer = new Promise(resolveModal => {
    onConfirmRemover = confirmationModal.$on("confirm", () => {
      resolveModal("confirm")
    })
    onCancelRemover = confirmationModal.$on("cancel", () => {
      resolveModal("cancel")
    })
  })

  answer.then((response) => {
    onConfirmRemover()
    onCancelRemover()
    resolve(answer)
  })

  // The codes below ensure the component will be destroyed after animation outro
  let outroEnd = new Promise(resolveOutro => {
    onOutroEndRemover = confirmationModal.$on("outroEnd", () => resolveOutro())
  })

  outroEnd.then(() => {
    onOutroEndRemover()
    confirmationModal.$destroy()
  })
})
