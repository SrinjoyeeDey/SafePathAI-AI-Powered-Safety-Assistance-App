import { inspect, InspectOptions } from "util";
import Versionless from "../Versionless";
import { AccountListInstance } from "./organization/account";
import { RoleAssignmentListInstance } from "./organization/roleAssignment";
import { UserListInstance } from "./organization/user";
export interface OrganizationContext {
    accounts: AccountListInstance;
    roleAssignments: RoleAssignmentListInstance;
    users: UserListInstance;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface OrganizationContextSolution {
    organizationSid: string;
}
export declare class OrganizationContextImpl implements OrganizationContext {
    protected _version: Versionless;
    protected _solution: OrganizationContextSolution;
    protected _uri: string;
    protected _accounts?: AccountListInstance;
    protected _roleAssignments?: RoleAssignmentListInstance;
    protected _users?: UserListInstance;
    constructor(_version: Versionless, organizationSid: string);
    get accounts(): AccountListInstance;
    get roleAssignments(): RoleAssignmentListInstance;
    get users(): UserListInstance;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): OrganizationContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface OrganizationSolution {
}
export interface OrganizationListInstance {
    _version: Versionless;
    _solution: OrganizationSolution;
    _uri: string;
    (organizationSid: string): OrganizationContext;
    get(organizationSid: string): OrganizationContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function OrganizationListInstance(version: Versionless): OrganizationListInstance;
