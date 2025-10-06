import KnowledgeBase from "../KnowledgeBase";
import Version from "../../base/Version";
import { KnowledgeListInstance } from "./v1/knowledge";
export default class V1 extends Version {
    /**
     * Initialize the V1 version of Knowledge
     *
     * @param domain - The Twilio (Twilio.Knowledge) domain
     */
    constructor(domain: KnowledgeBase);
    /** knowledge - { Twilio.Knowledge.V1.KnowledgeListInstance } resource */
    protected _knowledge?: KnowledgeListInstance;
    /** Getter for knowledge resource */
    get knowledge(): KnowledgeListInstance;
}
