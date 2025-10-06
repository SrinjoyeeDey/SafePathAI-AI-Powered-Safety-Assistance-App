import { inspect, InspectOptions } from "util";
import V1 from "../V1";
/**
 * Options to pass to create a ModuleDataInstance
 */
export interface ModuleDataListInstanceCreateOptions {
    /** A JSON object containing essential attributes that define a Listing. */
    moduleInfo?: string;
    /** A JSON object for providing Listing-specific configuration. Contains button setup, notification URL, and more. */
    configuration?: string;
}
export interface ModuleDataSolution {
}
export interface ModuleDataListInstance {
    _version: V1;
    _solution: ModuleDataSolution;
    _uri: string;
    /**
     * Create a ModuleDataInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataInstance
     */
    create(callback?: (error: Error | null, item?: ModuleDataInstance) => any): Promise<ModuleDataInstance>;
    /**
     * Create a ModuleDataInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataInstance
     */
    create(params: ModuleDataListInstanceCreateOptions, callback?: (error: Error | null, item?: ModuleDataInstance) => any): Promise<ModuleDataInstance>;
    /**
     * Fetch a ModuleDataInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataInstance
     */
    fetch(callback?: (error: Error | null, item?: ModuleDataInstance) => any): Promise<ModuleDataInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function ModuleDataListInstance(version: V1): ModuleDataListInstance;
interface ModuleDataResource {
    url: string;
    sid: string;
    description: Record<string, object>;
    support: Record<string, object>;
    policies: Record<string, object>;
    module_info: Record<string, object>;
    documentation: Record<string, object>;
    configuration: Record<string, object>;
    pricing: Record<string, object>;
    listings: Array<Record<string, object>>;
}
export declare class ModuleDataInstance {
    protected _version: V1;
    constructor(_version: V1, payload: ModuleDataResource);
    /**
     * URL to query the subresource.
     */
    url: string;
    /**
     * ModuleSid that identifies this Listing.
     */
    sid: string;
    /**
     * A JSON object describing the module and is displayed under the Description tab of the Module detail page. You can define the main body of the description, highlight key features or aspects of the module and if applicable, provide code samples for developers
     */
    description: Record<string, object>;
    /**
     * A JSON object containing information on how customers can obtain support for the module. Use this parameter to provide details such as contact information and support description.
     */
    support: Record<string, object>;
    /**
     * A JSON object describing the module\'s privacy and legal policies and is displayed under the Policies tab of the Module detail page. The maximum file size for Policies is 5MB
     */
    policies: Record<string, object>;
    /**
     * A JSON object containing essential attributes that define a module. This information is presented on the Module detail page in the Twilio Marketplace Catalog. You can pass the following attributes in the JSON object
     */
    moduleInfo: Record<string, object>;
    /**
     * A JSON object for providing comprehensive information, instructions, and resources related to the module
     */
    documentation: Record<string, object>;
    /**
     * A JSON object for providing listing specific configuration. Contains button setup, notification url, among others.
     */
    configuration: Record<string, object>;
    /**
     * A JSON object for providing Listing specific pricing information.
     */
    pricing: Record<string, object>;
    /**
     *
     */
    listings: Array<Record<string, object>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        url: string;
        sid: string;
        description: Record<string, object>;
        support: Record<string, object>;
        policies: Record<string, object>;
        moduleInfo: Record<string, object>;
        documentation: Record<string, object>;
        configuration: Record<string, object>;
        pricing: Record<string, object>;
        listings: Record<string, object>[];
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export {};
