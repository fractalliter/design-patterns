/**
 * Factory pattern,
 * A base factory with dependency injection that helps you to abstract your module from end user
 * @author Elias Rahmani
 * @param baseClass {Class}
 */

export class Factory{
    /**
     * A base class that all or part of the instances are prototyped from
     * @param baseClass {Class}
     */
    constructor(baseClass) {
        this._baseClass = baseClass;
    }

    /**
     * Register a dependency into the factory
     * @param property {string}
     * @param instance {Class}
     */
    register(property, instance) {
        if(instance.prototype instanceof this._baseClass)
            this[property] = (property in this && this[property] instanceof Array) ? [...this[property], instance] : [instance];
        else throw TypeError(`Instance is not prototype of ${this._baseClass}`)
    }

    /**
     * Get instance/instances of the classes or services
     * @param instanceName {string}
     * @param props {Array}
     * @returns {Uint8Array | BigInt64Array | any[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
     */
    getInstance(instanceName, props){
        if (typeof instanceName === "string" && props instanceof Array)
            return this[instanceName].map((Instance, index) => new Instance(props[index]));
        else if(typeof instanceName !== "string")
            throw new TypeError("Type of instanceName must be type of string");
        else
            throw new TypeError("Instance of props must be prototype of array from classes arguments");
    }

    /**
     * Remove a registered class from factory
     * @param property {string}
     * @param className {Class}
     */
    remove(property, className){
        if (property in this){
            this[property].splice(this[property].indexOf(className),1);
        }
        else throw Error("Provide a property that is exist in factory");
    }

    /**
     * Get base class that instance/instances prototyped from
     * @returns {Class}
     */
    get baseClass() {
        return this._baseClass;
    }

    /**
     * Set base class for registration of prototyped classes
     * @param newBaseClass {Class}
     */
    set baseClass(newBaseClass) {
        this._baseClass = newBaseClass;
    }

    /**
     * Get a property from object, maybe you can use it for checking for further process first
     * @param propertyName {string}
     * @returns {*}
     */
    getProperty(propertyName){
        return this[propertyName];
    }
}
