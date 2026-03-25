import Time "mo:core/Time";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type GasMixture = {
    name : Text;
    mixType : Text;
    tankSize : Nat;
    workingPressure : Nat;
    oxygenPercentage : Nat;
    heliumPercentage : Nat;
    nitrogenPercentage : Nat;
    timestamp : Time.Time;
  };

  let gasMixtureList = List.empty<GasMixture>();
  let maxCalculations = 20;

  public shared ({ caller }) func saveCalculation(
    name : Text,
    mixType : Text,
    tankSize : Nat,
    workingPressure : Nat,
    oxygenPercentage : Nat,
    heliumPercentage : Nat,
    nitrogenPercentage : Nat,
  ) : async () {
    if (gasMixtureList.size() >= maxCalculations) {
      Runtime.trap("Maximum number of saved calculations reached. ");
    };

    let gasMixture : GasMixture = {
      name;
      mixType;
      tankSize;
      workingPressure;
      oxygenPercentage;
      heliumPercentage;
      nitrogenPercentage;
      timestamp = Time.now();
    };

    gasMixtureList.add(gasMixture);
  };

  public query ({ caller }) func getAllCalculations() : async [GasMixture] {
    gasMixtureList.toArray();
  };

  public shared ({ caller }) func deleteCalculation(index : Nat) : async () {
    if (index >= gasMixtureList.size()) {
      Runtime.trap("Invalid index. ");
    };

    let newList = List.empty<GasMixture>();
    var currentIndex = 0;
    for (mixture in gasMixtureList.values()) {
      if (currentIndex != index) {
        newList.add(mixture);
      };
      currentIndex += 1;
    };
    gasMixtureList.clear();
    gasMixtureList.addAll(newList.values());
  };

  public shared ({ caller }) func clearAllCalculations() : async () {
    gasMixtureList.clear();
  };
};
