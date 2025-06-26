
export function valueIsArray(value) {
    const className = value !== undefined && value.__proto__.constructor.name;
    return className == 'Array';
  }
  
  export function valueIsNode(value) {
    // const className = value.__proto__.constructor.name;
    // return className == "Node";
    return value && value.labels && value.identity && value.properties;
  }
  
  export function valueIsRelationship(value) {
    // const className = value.__proto__.constructor.name;
    // return className == "Relationship";
    return value && value.type && value.start && value.end && value.identity && value.properties;
  }
  
  export function valueIsPath(value) {
    // const className = value.__proto__.constructor.name;
    // return className == "Path"
    return value && value.start && value.end && value.segments && value.length;
  }
  
  export function valueisPoint(value) {
    // Look at the properties and identify the type.
    return value && value.x && value.y && value.srid;
  }
  
  export function valueIsObject(value) {
    // TODO - this will not work in production builds. Need alternative.
    const className = value.__proto__.constructor.name;
    return className == 'Object';
  }
  
  export function toNumber(ref) {
    if (ref === undefined || typeof ref === 'number') {
      return ref;
    }
    let { low, high } = ref;
    let res = high;
  
    for (let i = 0; i < 32; i++) {
      res *= 2;
    }
  
    return low + res;
  }