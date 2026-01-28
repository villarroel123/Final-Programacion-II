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
var _User_id, _User_name, _User_password, _User_email, _User_isSubscribed, _User_isAdmin, _User_likedPostIDs;
export class User {
    constructor(data) {
        _User_id.set(this, void 0);
        _User_name.set(this, void 0);
        _User_password.set(this, void 0);
        _User_email.set(this, void 0);
        _User_isSubscribed.set(this, void 0);
        _User_isAdmin.set(this, void 0);
        _User_likedPostIDs.set(this, void 0);
        __classPrivateFieldSet(this, _User_id, data.id, "f");
        __classPrivateFieldSet(this, _User_name, data.name, "f");
        __classPrivateFieldSet(this, _User_password, data.password, "f");
        __classPrivateFieldSet(this, _User_email, data.email, "f");
        __classPrivateFieldSet(this, _User_isSubscribed, data.isSubscribed, "f");
        __classPrivateFieldSet(this, _User_isAdmin, data.isAdmin, "f");
        __classPrivateFieldSet(this, _User_likedPostIDs, data.likedPostIDs, "f");
    }
    //Getters
    getId() {
        return __classPrivateFieldGet(this, _User_id, "f");
    }
    getName() {
        return __classPrivateFieldGet(this, _User_name, "f");
    }
    getPassword() {
        return __classPrivateFieldGet(this, _User_password, "f");
    }
    getEmail() {
        return __classPrivateFieldGet(this, _User_email, "f");
    }
    getIsSubscribed() {
        return __classPrivateFieldGet(this, _User_isSubscribed, "f");
    }
    getIsAdmin() {
        return __classPrivateFieldGet(this, _User_isAdmin, "f");
    }
    getLikedPostIds() {
        return __classPrivateFieldGet(this, _User_likedPostIDs, "f");
    }
    //Setters
    setId(value) {
        __classPrivateFieldSet(this, _User_id, value, "f");
    }
    setName(value) {
        __classPrivateFieldSet(this, _User_name, value, "f");
    }
    setPassword(value) {
        __classPrivateFieldSet(this, _User_password, value, "f");
    }
    setEmail(value) {
        __classPrivateFieldSet(this, _User_email, value, "f");
    }
    setIssubscribed(value) {
        __classPrivateFieldSet(this, _User_isSubscribed, value, "f");
    }
    setIsadmin(value) {
        __classPrivateFieldSet(this, _User_isAdmin, value, "f");
    }
    setLikedPostIds(value) {
        __classPrivateFieldSet(this, _User_likedPostIDs, value, "f");
    }
}
_User_id = new WeakMap(), _User_name = new WeakMap(), _User_password = new WeakMap(), _User_email = new WeakMap(), _User_isSubscribed = new WeakMap(), _User_isAdmin = new WeakMap(), _User_likedPostIDs = new WeakMap();
//# sourceMappingURL=User.js.map