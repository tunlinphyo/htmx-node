import 'htmx.org'
import { Utils } from "./utils"
import { HtmxHelpers } from './htmx'

document.addEventListener('DOMContentLoaded', () => {
    new HtmxHelpers()
    Utils.log("TEST")
})