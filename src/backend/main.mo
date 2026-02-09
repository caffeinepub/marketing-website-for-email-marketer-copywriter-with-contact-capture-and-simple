import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile type
  public type UserProfile = {
    name : Text;
  };

  // Storage for user profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Get caller's user profile (user-only)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Get any user's profile (own profile or admin)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save caller's user profile (user-only)
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Inquiry data structure
  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    company : ?Text;
    message : Text;
    serviceInterest : Text;
    timestamp : Time.Time;
  };

  // Module for Inquiry comparisons
  module Inquiry {
    public func compare(a : Inquiry, b : Inquiry) : Order.Order {
      Nat.compare(b.id, a.id); // Descending order by ID
    };
  };

  // Storage for inquiries
  let inquiries = Map.empty<Nat, Inquiry>();
  var inquiryCounter = 0;

  // Create new inquiry (anonymous allowed)
  public shared ({ caller }) func createInquiry(name : Text, email : Text, company : ?Text, message : Text, serviceInterest : Text) : async () {
    let newInquiry : Inquiry = {
      id = inquiryCounter;
      name;
      email;
      company;
      message;
      serviceInterest;
      timestamp = Time.now();
    };

    inquiries.add(inquiryCounter, newInquiry);
    inquiryCounter += 1;
  };

  // List all inquiries (admin-only)
  public query ({ caller }) func listInquiries() : async [Inquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.values().toArray().sort();
  };

  // Delete inquiry by ID (admin-only)
  public shared ({ caller }) func deleteInquiry(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };

    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?_) {
        inquiries.remove(id);
      };
    };
  };
};
