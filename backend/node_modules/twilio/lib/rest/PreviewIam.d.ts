import { TokenListInstance } from "./previewIam/v1/token";
import { AuthorizeListInstance } from "./previewIam/v1/authorize";
import PreviewIamBase from "./PreviewIamBase";
import { OrganizationListInstance } from "./previewIam/versionless/organization";
declare class PreviewIam extends PreviewIamBase {
    _organization?: OrganizationListInstance;
    /**
     * @deprecated - Use v1.tokens instead
     */
    get tokens(): TokenListInstance;
    /**
     * @deprecated - Use v1.authorize instead
     */
    get authorize(): AuthorizeListInstance;
    /** Getter for organization resource */
    get organization(): OrganizationListInstance;
}
export = PreviewIam;
