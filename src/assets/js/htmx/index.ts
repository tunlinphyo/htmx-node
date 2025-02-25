import { ConfirmHelper } from "./confirm"
import { DialogHelper } from "./dialog"

export class HtmxHelpers {
    constructor() {
        this.eventListeners()
    }

    private eventListeners() {
        const dialog = new DialogHelper()
        const confirm = new ConfirmHelper()

        document.body.addEventListener("htmx:beforeRequest", (event) => {
            dialog.openDialog(event)
        })

        document.body.addEventListener("dialogClose", (event) => {
            dialog.closeDialog(event)
        })

        document.body.addEventListener("htmx:confirm", function (event) {
            confirm.openConfirm(event)
        })
    }
}