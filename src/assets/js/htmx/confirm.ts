import { Utils } from "../utils"

export class ConfirmHelper {
    openConfirm(event: Event) {
        const htmxEvent = event as CustomEvent
        const triggerElement = htmxEvent.target as HTMLElement
        if (!triggerElement) return
        const confirmMessage = triggerElement.getAttribute("hx-confirm")
        if (!confirmMessage) return
        const dialog = Utils.elem<HTMLDialogElement>("dialog[data-dialog=confirm]")
        if (!dialog) return

        event.preventDefault() // Prevent default confirmation if `hx-confirm` exists

        const messageEl = Utils.elem("[data-dialog-message]")
        const yesButton = Utils.elem<HTMLButtonElement>("[data-dialog-confirm=yes]")

        if (messageEl) messageEl.textContent = confirmMessage
        dialog.showModal()

        if (yesButton) {
            yesButton.onclick = function () {
                htmxEvent.detail.issueRequest(true)
            }
        }
    }
}