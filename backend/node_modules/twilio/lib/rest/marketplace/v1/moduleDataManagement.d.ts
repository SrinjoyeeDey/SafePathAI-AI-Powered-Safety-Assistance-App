import { inspect, InspectOptions } from "util";
import V1 from "../V1";
/**
 * Options to pass to update a ModuleDataManagementInstance
 */
export interface ModuleDataManagementContextUpdateOptions {
    /** A JSON object containing essential attributes that define a Listing. */
    moduleInfo?: string;
    /** A JSON object describing the Listing. You can define the main body of the description, highlight key features or aspects of the Listing, and provide code samples for developers if applicable. */
    description?: string;
    /** A JSON object for providing comprehensive information, instructions, and resources related to the Listing. */
    documentation?: string;
    /** A JSON object describing the Listing\\\'s privacy and legal policies. The maximum file size for Policies is 5MB. */
    policies?: string;
    /** A JSON object containing information on how Marketplace users can obtain support for the Listing. Use this parameter to provide details such as contact information and support description. */
    support?: string;
    /** A JSON object for providing Listing-specific configuration. Contains button setup, notification URL, and more. */
    configuration?: string;
    /** A JSON object for providing Listing\\\'s purchase options. */
    pricing?: string;
}
export interface ModuleDataManagementContext {
    /**
     * Fetch a ModuleDataManagementInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataManagementInstance
     */
    fetch(callback?: (error: Error | null, item?: ModuleDataManagementInstance) => any): Promise<ModuleDataManagementInstance>;
    /**
     * Update a ModuleDataManagementInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataManagementInstance
     */
    update(callback?: (error: Error | null, item?: ModuleDataManagementInstance) => any): Promise<ModuleDataManagementInstance>;
    /**
     * Update a ModuleDataManagementInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataManagementInstance
     */
    update(params: ModuleDataManagementContextUpdateOptions, callback?: (error: Error | null, item?: ModuleDataManagementInstance) => any): Promise<ModuleDataManagementInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface ModuleDataManagementContextSolution {
    sid: string;
}
export declare class ModuleDataManagementContextImpl implements ModuleDataManagementContext {
    protected _version: V1;
    protected _solution: ModuleDataManagementContextSolution;
    protected _uri: string;
    constructor(_version: V1, sid: string);
    fetch(callback?: (error: Error | null, item?: ModuleDataManagementInstance) => any): Promise<ModuleDataManagementInstance>;
    update(params?: ModuleDataManagementContextUpdateOptions | ((error: Error | null, item?: ModuleDataManagementInstance) => any), callback?: (error: Error | null, item?: ModuleDataManagementInstance) => any): Promise<ModuleDataManagementInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): ModuleDataManagementContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface ModuleDataManagementResource {
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
export declare class ModuleDataManagementInstance {
    protected _version: V1;
    protected _solution: ModuleDataManagementContextSolution;
    protected _context?: ModuleDataManagementContext;
    constructor(_version: V1, payload: ModuleDataManagementResource, sid?: string);
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
    private get _proxy();
    /**
     * Fetch a ModuleDataManagementInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataManagementInstance
     */
    fetch(callback?: (error: Error | null, item?: ModuleDataManagementInstance) => any): Promise<ModuleDataManagementInstance>;
    /**
     * Update a ModuleDataManagementInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataManagementInstance
     */
    update(callback?: (error: Error | null, item?: ModuleDataManagementInstance) => any): Promise<ModuleDataManagementInstance>;
    /**
     * Update a ModuleDataManagementInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ModuleDataManagementInstance
     */
    update(params: ModuleDataManagementContextUpdateOptions, callback?: (error: Error | null, item?: ModuleDataManagementInstance) => any): Promise<ModuleDataManagementInstance>;
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
export interface ModuleDataManagementSolution {
}
export interface ModuleDataManagementListInstance {
    _version: V1;
    _solution: ModuleDataManagementSolution;
    _uri: string;
    (sid: string): ModuleDataManagementContext;
    get(sid: string): ModuleDataManagementContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function ModuleDataManagementListInstance(version: V1): ModuleDataManagementListInstance;
export {};
