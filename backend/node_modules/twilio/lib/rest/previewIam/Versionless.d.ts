import PreviewIamBase from "../PreviewIamBase";
import Version from "../../base/Version";
import { OrganizationListInstance } from "./versionless/organization";
export default class Versionless extends Version {
    /**
     * Initialize the Versionless version of PreviewIam
     *
     * @param domain - The Twilio (Twilio.PreviewIam) domain
     */
    constructor(domain: PreviewIamBase);
    /** organization - { Twilio.PreviewIam.Versionless.OrganizationListInstance } resource */
    protected _organization?: OrganizationListInstance;
    /** Getter for organization resource */
    get organization(): OrganizationListInstance;
}
