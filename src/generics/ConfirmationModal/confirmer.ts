import ConfirmationModal from "./ConfirmationModal"

export const askForConfirmation = async (text) => {
  const confirmationModal = new ConfirmationModal({
    target: document.body,
    props: {
      text,
    }
  })

  let answer = new Promise()

  const removeOnConfirm = confirmationModal.$on("confirm", () => answer.resolve("confirm"))
  const removeOnCancel = confirmationModal.$on("cancel", () => answer.resolve("cancel"))
  
  await answer
  
  removeOnConfirm()
  removeOnCancel()
  confirmationModal.$destroy()

  return answer
}

// UNUSED FOR NOW