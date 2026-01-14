var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Product_id, _Product_name, _Product_price, _Product_category, _Product_image, _Product_description;
export class Product {
    //especifico propiedades
    constructor(id, name, price, category, image, description) {
        _Product_id.set(this, void 0);
        _Product_name.set(this, void 0);
        _Product_price.set(this, void 0);
        _Product_category.set(this, void 0);
        _Product_image.set(this, void 0);
        _Product_description.set(this, void 0);
        __classPrivateFieldSet(this, _Product_id, id, "f");
        __classPrivateFieldSet(this, _Product_name, name, "f");
        __classPrivateFieldSet(this, _Product_price, price, "f");
        __classPrivateFieldSet(this, _Product_category, category, "f");
        __classPrivateFieldSet(this, _Product_image, image, "f");
        __classPrivateFieldSet(this, _Product_description, description, "f");
    }
    //Getters
    getId() {
        return __classPrivateFieldGet(this, _Product_id, "f");
    }
    getName() {
        return __classPrivateFieldGet(this, _Product_name, "f");
    }
    getPrice() {
        return __classPrivateFieldGet(this, _Product_price, "f");
    }
    getCategory() {
        return __classPrivateFieldGet(this, _Product_category, "f");
    }
    getImage() {
        return __classPrivateFieldGet(this, _Product_image, "f");
    }
    getDescription() {
        return __classPrivateFieldGet(this, _Product_description, "f");
    }
    //Setters
    set id(value) {
        __classPrivateFieldSet(this, _Product_id, value, "f");
    }
    set name(value) {
        __classPrivateFieldSet(this, _Product_name, value, "f");
    }
    set price(value) {
        __classPrivateFieldSet(this, _Product_price, value, "f");
    }
    set category(value) {
        __classPrivateFieldSet(this, _Product_category, value, "f");
    }
    set image(value) {
        __classPrivateFieldSet(this, _Product_image, value, "f");
    }
    set description(value) {
        __classPrivateFieldSet(this, _Product_description, value, "f");
    }
}
_Product_id = new WeakMap(), _Product_name = new WeakMap(), _Product_price = new WeakMap(), _Product_category = new WeakMap(), _Product_image = new WeakMap(), _Product_description = new WeakMap();
//# sourceMappingURL=Product.js.map