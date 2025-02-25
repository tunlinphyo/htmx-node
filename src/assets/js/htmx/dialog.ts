import { Utils } from "../utils"

export class DialogHelper {
    openDialog(event: Event): void {
        const elem = event.target as HTMLElement

        if (!elem || !elem.dataset.dialogId) return

        const dialogId = elem.dataset.dialogId
        const dialog = Utils.elem<HTMLDialogElement>(dialogId)

        if (!dialog) return

        dialog.showModal()
    }

    closeDialog(event: Event) {
        const htmxEvent = event as CustomEvent
        const dialogId = htmxEvent.detail.id
        if (!dialogId) return
        const dialog = Utils.elem<HTMLDialogElement>(dialogId)
        if (dialog) dialog.close()
    }
}