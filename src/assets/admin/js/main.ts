import 'htmx.org'
import { Utils } from "../../js/utils"
import { HtmxHelpers } from '../../js/htmx'

document.addEventListener('DOMContentLoaded', () => {
    new HtmxHelpers()
    Utils.log("ADMIN_LOADED")
})