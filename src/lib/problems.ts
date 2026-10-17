export type Difficulty = "Easy" | "Medium" | "Hard";
export type Language = "java" | "cpp" | "javascript";

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
  description: string;
  constraints: string;
  hints: string[];
  starterCode: Record<Language, string>;
  solution: Record<Language, string>;
  testCases: TestCase[];
  order: number;
}

export const PROBLEMS: Problem[] = [
  {
    id: "1",
    slug: "design-parking-lot",
    title: "Design a Parking Lot",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Singleton", "Factory", "Strategy"],
    order: 1,
    description: `## Problem Statement

Design a parking lot system that can accommodate different types of vehicles. The system should be able to:

- Support multiple levels/floors
- Handle different vehicle types (Motorcycle, Car, Truck)
- Have different parking spot sizes (Small, Medium, Large)
- Issue and process parking tickets
- Calculate parking fees based on time

## Design Requirements

**Entities to identify:**
- \`ParkingLot\` — Main system entry point (Singleton)
- \`Level\` — A floor in the parking lot
- \`ParkingSpot\` — Individual spot with size and availability
- \`Vehicle\` — Abstract vehicle with subtypes
- \`ParkingTicket\` — Issued on entry, used on exit
- \`FeeCalculator\` — Strategy for calculating fees

**Key Behaviors:**
- \`parkVehicle(vehicle)\` → returns a \`ParkingTicket\` or null if full
- \`unparkVehicle(ticket)\` → returns the fee amount
- \`getAvailableSpots()\` → count of available spots
- Vehicles can only park in appropriate-sized spots (Motorcycle → Small/Medium/Large, Car → Medium/Large, Truck → Large only)`,
    constraints: `- A parking lot has 1–5 levels
- Each level has 10–100 spots
- Spot sizes: Small (bikes), Medium (cars), Large (trucks/buses)
- Parking fee: $2/hour for Small, $4/hour for Medium, $6/hour for Large
- A vehicle must park in the smallest available spot that fits it
- The system must be thread-safe (assume concurrent access)`,
    hints: [
      "Start by identifying all the real-world entities. What physical objects exist in a parking lot?",
      "Think about what 'fits' means — a Car can fit in a Medium or Large spot, but not Small. How do you model this relationship?",
      "ParkingLot should be a Singleton — only one instance should exist in the system.",
      "Use the Strategy pattern for fee calculation — different parking lots might charge differently.",
      "Store the entry timestamp in the ParkingTicket so you can calculate duration on exit.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.time.*;

// TODO: Define your enums first
// enum VehicleType { MOTORCYCLE, CAR, TRUCK }
// enum SpotSize { SMALL, MEDIUM, LARGE }

public class ParkingLot {
    // Singleton instance
    private static ParkingLot instance;

    private ParkingLot() {
        // Initialize levels and spots
    }

    public static ParkingLot getInstance() {
        // TODO: Implement singleton (thread-safe)
        return null;
    }

    public ParkingTicket parkVehicle(Vehicle vehicle) {
        // TODO: Find available spot, issue ticket
        return null;
    }

    public double unparkVehicle(ParkingTicket ticket) {
        // TODO: Free the spot, calculate and return fee
        return 0.0;
    }

    public int getAvailableSpots() {
        // TODO: Count all available spots across levels
        return 0;
    }
}

class Vehicle {
    // TODO: Implement Vehicle with type and plate
}

class ParkingTicket {
    // TODO: Implement ticket with spot, vehicle, entry time
}

class ParkingSpot {
    // TODO: Implement spot with size, availability
}

class Level {
    // TODO: Implement level with list of spots
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <memory>
using namespace std;

// TODO: Define enums
// enum class VehicleType { MOTORCYCLE, CAR, TRUCK };
// enum class SpotSize { SMALL, MEDIUM, LARGE };

class Vehicle {
public:
    // TODO: Add vehicleType and licensePlate
};

class ParkingSpot {
public:
    // TODO: Add size, vehicle, availability
    bool canFitVehicle(const Vehicle& v) {
        // TODO: Implement fit logic
        return false;
    }
};

class ParkingTicket {
public:
    // TODO: Add spot, vehicle, entryTime
};

class Level {
private:
    vector<ParkingSpot> spots;
public:
    // TODO: Initialize spots, add park/unpark methods
};

class ParkingLot {
private:
    static ParkingLot* instance;
    vector<Level> levels;
    ParkingLot() {}
public:
    static ParkingLot* getInstance() {
        // TODO: Implement singleton
        return nullptr;
    }

    ParkingTicket* parkVehicle(Vehicle& v) {
        // TODO: Find spot, issue ticket
        return nullptr;
    }

    double unparkVehicle(ParkingTicket* ticket) {
        // TODO: Free spot, calculate fee
        return 0.0;
    }
};`,
      javascript: `class VehicleType {
  static MOTORCYCLE = 'MOTORCYCLE';
  static CAR = 'CAR';
  static TRUCK = 'TRUCK';
}

class SpotSize {
  static SMALL = 'SMALL';
  static MEDIUM = 'MEDIUM';
  static LARGE = 'LARGE';
}

class Vehicle {
  constructor(type, licensePlate) {
    // TODO: Initialize vehicle
  }
}

class ParkingSpot {
  constructor(size) {
    // TODO: Initialize spot with size and availability
  }

  canFitVehicle(vehicle) {
    // TODO: Check if vehicle fits based on type/size
    return false;
  }

  park(vehicle) {
    // TODO: Park the vehicle in this spot
  }

  unpark() {
    // TODO: Remove vehicle from this spot
  }
}

class ParkingTicket {
  constructor(spot, vehicle) {
    // TODO: Initialize ticket with spot, vehicle, entryTime
  }

  calculateFee() {
    // TODO: Calculate fee based on time and spot size
    return 0;
  }
}

class Level {
  constructor(levelNum, numSpots) {
    // TODO: Initialize level with spots
  }

  parkVehicle(vehicle) {
    // TODO: Find available spot and park
    return null;
  }
}

class ParkingLot {
  constructor() {
    // TODO: Initialize levels
  }

  parkVehicle(vehicle) {
    // TODO: Try each level, return ticket or null
    return null;
  }

  unparkVehicle(ticket) {
    // TODO: Unpark, return fee
    return 0;
  }

  getAvailableSpots() {
    // TODO: Count available spots
    return 0;
  }
}`,
    },
    solution: {
      java: `import java.util.*;
import java.time.*;

enum VehicleType { MOTORCYCLE, CAR, TRUCK }
enum SpotSize { SMALL, MEDIUM, LARGE }

class Vehicle {
    private VehicleType type;
    private String licensePlate;
    public Vehicle(VehicleType type, String licensePlate) {
        this.type = type;
        this.licensePlate = licensePlate;
    }
    public VehicleType getType() { return type; }
    public String getLicensePlate() { return licensePlate; }
}

class ParkingSpot {
    private SpotSize size;
    private Vehicle currentVehicle;
    private int spotId;
    public ParkingSpot(SpotSize size, int spotId) {
        this.size = size;
        this.spotId = spotId;
    }
    public boolean isAvailable() { return currentVehicle == null; }
    public boolean canFitVehicle(Vehicle v) {
        if (!isAvailable()) return false;
        if (v.getType() == VehicleType.MOTORCYCLE) return true;
        if (v.getType() == VehicleType.CAR) return size == SpotSize.MEDIUM || size == SpotSize.LARGE;
        return size == SpotSize.LARGE; // TRUCK
    }
    public void park(Vehicle v) { this.currentVehicle = v; }
    public void unpark() { this.currentVehicle = null; }
    public SpotSize getSize() { return size; }
    public int getSpotId() { return spotId; }
}

class ParkingTicket {
    private ParkingSpot spot;
    private Vehicle vehicle;
    private LocalDateTime entryTime;
    private static int ticketCounter = 0;
    private int ticketId;
    public ParkingTicket(ParkingSpot spot, Vehicle vehicle) {
        this.spot = spot;
        this.vehicle = vehicle;
        this.entryTime = LocalDateTime.now();
        this.ticketId = ++ticketCounter;
    }
    public double calculateFee() {
        long minutes = Duration.between(entryTime, LocalDateTime.now()).toMinutes();
        double hours = Math.max(1, Math.ceil(minutes / 60.0));
        double rate = switch (spot.getSize()) {
            case SMALL -> 2.0;
            case MEDIUM -> 4.0;
            case LARGE -> 6.0;
        };
        return hours * rate;
    }
    public ParkingSpot getSpot() { return spot; }
    public int getTicketId() { return ticketId; }
}

class Level {
    private List<ParkingSpot> spots = new ArrayList<>();
    private int levelNum;
    public Level(int levelNum, int numSpots) {
        this.levelNum = levelNum;
        for (int i = 0; i < numSpots / 3; i++) spots.add(new ParkingSpot(SpotSize.SMALL, i));
        for (int i = numSpots / 3; i < 2 * numSpots / 3; i++) spots.add(new ParkingSpot(SpotSize.MEDIUM, i));
        for (int i = 2 * numSpots / 3; i < numSpots; i++) spots.add(new ParkingSpot(SpotSize.LARGE, i));
    }
    public ParkingTicket parkVehicle(Vehicle v) {
        for (ParkingSpot spot : spots) {
            if (spot.canFitVehicle(v)) {
                spot.park(v);
                return new ParkingTicket(spot, v);
            }
        }
        return null;
    }
    public long getAvailableSpots() {
        return spots.stream().filter(ParkingSpot::isAvailable).count();
    }
}

public class ParkingLot {
    private static ParkingLot instance;
    private List<Level> levels = new ArrayList<>();
    private ParkingLot() {
        for (int i = 0; i < 3; i++) levels.add(new Level(i, 30));
    }
    public static synchronized ParkingLot getInstance() {
        if (instance == null) instance = new ParkingLot();
        return instance;
    }
    public ParkingTicket parkVehicle(Vehicle vehicle) {
        for (Level level : levels) {
            ParkingTicket ticket = level.parkVehicle(vehicle);
            if (ticket != null) return ticket;
        }
        return null; // Lot is full
    }
    public double unparkVehicle(ParkingTicket ticket) {
        double fee = ticket.calculateFee();
        ticket.getSpot().unpark();
        return fee;
    }
    public int getAvailableSpots() {
        return (int) levels.stream().mapToLong(Level::getAvailableSpots).sum();
    }

    // Test
    public static void main(String[] args) throws InterruptedException {
        ParkingLot lot = ParkingLot.getInstance();
        System.out.println("Available spots: " + lot.getAvailableSpots());
        Vehicle car = new Vehicle(VehicleType.CAR, "ABC-123");
        ParkingTicket ticket = lot.parkVehicle(car);
        System.out.println("Parked: " + (ticket != null ? "Ticket #" + ticket.getTicketId() : "Full"));
        System.out.println("Available after park: " + lot.getAvailableSpots());
        double fee = lot.unparkVehicle(ticket);
        System.out.println("Fee: $" + fee);
        System.out.println("Available after unpark: " + lot.getAvailableSpots());
    }
}`,
      cpp: `// Reference solution omitted for brevity — see Java solution for design`,
      javascript: `// Reference solution omitted for brevity — see Java solution for design`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Park a car and get a valid ticket",
        input: `ParkingLot lot = ParkingLot.getInstance();
Vehicle car = new Vehicle(VehicleType.CAR, "ABC-123");
ParkingTicket ticket = lot.parkVehicle(car);
System.out.println(ticket != null ? "PASS" : "FAIL");`,
        expectedOutput: "PASS",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Available spots decrease after parking",
        input: `ParkingLot lot = ParkingLot.getInstance();
int before = lot.getAvailableSpots();
lot.parkVehicle(new Vehicle(VehicleType.CAR, "XYZ-456"));
int after = lot.getAvailableSpots();
System.out.println(before - after == 1 ? "PASS" : "FAIL");`,
        expectedOutput: "PASS",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Unpark restores available spots",
        input: `ParkingLot lot = ParkingLot.getInstance();
int before = lot.getAvailableSpots();
ParkingTicket t = lot.parkVehicle(new Vehicle(VehicleType.CAR, "T-001"));
lot.unparkVehicle(t);
System.out.println(lot.getAvailableSpots() == before ? "PASS" : "FAIL");`,
        expectedOutput: "PASS",
        isHidden: false,
      },
      {
        id: "tc4",
        description: "Motorcycle can park in small spot",
        input: `ParkingLot lot = ParkingLot.getInstance();
Vehicle bike = new Vehicle(VehicleType.MOTORCYCLE, "BIKE-1");
ParkingTicket t = lot.parkVehicle(bike);
System.out.println(t != null ? "PASS" : "FAIL");`,
        expectedOutput: "PASS",
        isHidden: false,
      },
      {
        id: "tc5",
        description: "Lot returns null when full",
        input: `// Fill all spots, then try to park`,
        expectedOutput: "null",
        isHidden: true,
      },
    ],
  },
  {
    id: "2",
    slug: "design-movie-ticket-booking",
    title: "Design a Movie Ticket Booking System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Observer", "Factory", "Singleton"],
    order: 2,
    description: `## Problem Statement

Design a movie ticket booking system (like BookMyShow or Fandango) that allows users to:

- Browse movies and showtimes
- Select seats from a seat map
- Book and cancel tickets
- Handle concurrent booking (prevent double-booking)

## Design Requirements

**Key Entities:**
- \`Movie\` — Title, genre, duration, rating
- \`Theater\` — Screens, location
- \`Screen\` — Physical screen with seating layout
- \`Show\` — A movie at a theater at a specific time
- \`Seat\` — Individual seat with row/column/type (Normal, Premium, VIP)
- \`Booking\` — Ties user, show, and seats together
- \`Payment\` — Handles payment processing

**Key Behaviors:**
- \`searchShows(movie, date)\` → list of shows
- \`getSeatMap(showId)\` → 2D grid of seats
- \`bookSeats(showId, seatIds, userId)\` → Booking or throws if unavailable
- \`cancelBooking(bookingId)\` → releases seats`,
    constraints: `- A screen has 10–300 seats arranged in rows
- Seat types: Normal ($10), Premium ($15), VIP ($25)
- A booking can have 1–10 seats
- Seats must be locked during payment (max 10 min hold)
- Two users cannot book the same seat for the same show
- Cancellation is allowed up to 2 hours before show time`,
    hints: [
      "Use an enum for SeatStatus: AVAILABLE, LOCKED, BOOKED",
      "The booking flow: search → select seats → lock seats → pay → confirm booking",
      "To prevent double-booking, use synchronized or atomic operations when locking seats",
      "Observer pattern: notify user when booking is confirmed or payment fails",
      "SeatMatrix can be modeled as a 2D array or a Map<SeatId, Seat>",
    ],
    starterCode: {
      java: `import java.util.*;
import java.time.*;

enum SeatType { NORMAL, PREMIUM, VIP }
enum SeatStatus { AVAILABLE, LOCKED, BOOKED }
enum BookingStatus { PENDING, CONFIRMED, CANCELLED }

public class MovieBookingSystem {

    public List<Show> searchShows(String movieTitle, LocalDate date) {
        // TODO: Search shows by movie and date
        return new ArrayList<>();
    }

    public List<List<Seat>> getSeatMap(String showId) {
        // TODO: Return 2D seat grid for a show
        return new ArrayList<>();
    }

    public Booking bookSeats(String showId, List<String> seatIds, String userId) {
        // TODO: Lock seats, create booking, process payment
        // Throw exception if any seat is unavailable
        return null;
    }

    public boolean cancelBooking(String bookingId) {
        // TODO: Cancel booking, release seats
        return false;
    }
}

class Movie {
    // TODO: title, genre, duration, rating
}

class Show {
    // TODO: movie, screen, startTime, seats map
}

class Seat {
    // TODO: id, row, col, type, status
}

class Booking {
    // TODO: id, userId, show, seats, status, totalAmount
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <map>
using namespace std;

enum class SeatType { NORMAL, PREMIUM, VIP };
enum class SeatStatus { AVAILABLE, LOCKED, BOOKED };

class Seat {
public:
    string id;
    int row, col;
    SeatType type;
    SeatStatus status;
    // TODO: Complete seat implementation
};

class Show {
public:
    // TODO: Implement show with movie, screen, time, seats
};

class Booking {
public:
    // TODO: Implement booking
};

class MovieBookingSystem {
public:
    vector<Show> searchShows(string movieTitle, string date) {
        // TODO
        return {};
    }

    Booking* bookSeats(string showId, vector<string> seatIds, string userId) {
        // TODO: atomic seat locking
        return nullptr;
    }

    bool cancelBooking(string bookingId) {
        // TODO
        return false;
    }
};`,
      javascript: `class SeatType {
  static NORMAL = 'NORMAL';
  static PREMIUM = 'PREMIUM';
  static VIP = 'VIP';
}

class SeatStatus {
  static AVAILABLE = 'AVAILABLE';
  static LOCKED = 'LOCKED';
  static BOOKED = 'BOOKED';
}

class Movie {
  constructor(title, genre, durationMinutes) {
    // TODO
  }
}

class Seat {
  constructor(id, row, col, type) {
    // TODO: Initialize with AVAILABLE status
  }
}

class Show {
  constructor(movie, screen, startTime) {
    // TODO: Initialize show with seat map
  }

  lockSeats(seatIds) {
    // TODO: Lock seats if all available, throw if not
  }

  confirmSeats(seatIds) {
    // TODO: Confirm locked seats as BOOKED
  }

  releaseSeats(seatIds) {
    // TODO: Release seats back to AVAILABLE
  }
}

class Booking {
  constructor(userId, show, seats) {
    // TODO
  }
}

class MovieBookingSystem {
  constructor() {
    this.shows = new Map();
    this.bookings = new Map();
  }

  bookSeats(showId, seatIds, userId) {
    // TODO: lock → pay → confirm flow
    return null;
  }

  cancelBooking(bookingId) {
    // TODO
    return false;
  }
}`,
    },
    solution: {
      java: `// See problem hints and implement — reference solution available after submission`,
      cpp: `// See problem hints and implement — reference solution available after submission`,
      javascript: `// See problem hints and implement — reference solution available after submission`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Book available seats successfully",
        input: "Book 2 available seats for a show",
        expectedOutput: "Booking created with CONFIRMED status",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Cannot double-book the same seat",
        input: "Two users try to book same seat simultaneously",
        expectedOutput: "Second booking throws exception or returns null",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Cancel booking releases seats",
        input: "Book seats, then cancel the booking",
        expectedOutput: "Seats return to AVAILABLE status",
        isHidden: false,
      },
      {
        id: "tc4",
        description: "Total price is calculated correctly",
        input: "Book 1 NORMAL + 1 VIP seat",
        expectedOutput: "$35",
        isHidden: false,
      },
    ],
  },
  {
    id: "3",
    slug: "design-vending-machine",
    title: "Design a Vending Machine",
    difficulty: "Medium",
    category: "State Machines",
    tags: ["State", "Singleton"],
    order: 3,
    description: `## Problem Statement

Design a vending machine that:

- Holds different products with prices and quantities
- Accepts coins/bills as payment
- Dispenses products and returns change
- Has clear state transitions

## Design Requirements

The vending machine has 4 states:
1. **Idle** — Waiting for user input
2. **HasMoney** — Money inserted, waiting for product selection
3. **Dispensing** — Product selected, dispensing
4. **OutOfStock** — Selected product is unavailable

**Key Behaviors:**
- \`insertMoney(amount)\` — Insert coins/bills
- \`selectProduct(productCode)\` — Choose a product
- \`dispenseProduct()\` — Give out product and change
- \`cancelTransaction()\` — Return inserted money`,
    constraints: `- Accepts denominations: $0.25, $0.50, $1.00, $5.00, $10.00, $20.00
- Products have a price, name, and quantity
- Must give exact change (or reject if unable to)
- State transitions must be enforced — can't select product before inserting money
- Machine can hold up to 10 distinct products, 20 units each`,
    hints: [
      "Use the State design pattern — each state is a class with the same interface",
      "The machine delegates all actions to the current state object",
      "Transitions happen inside state methods: insertMoney() in Idle → transitions to HasMoney",
      "Change-making is a classic greedy/DP problem — use greedy with denominations",
      "Keep an inventory map: productCode → Product(name, price, quantity)",
    ],
    starterCode: {
      java: `import java.util.*;

interface VendingMachineState {
    void insertMoney(double amount);
    void selectProduct(String productCode);
    void dispenseProduct();
    void cancel();
}

public class VendingMachine {
    private VendingMachineState idleState;
    private VendingMachineState hasMoneyState;
    private VendingMachineState dispensingState;
    private VendingMachineState outOfStockState;

    private VendingMachineState currentState;
    private double insertedAmount = 0;
    private String selectedProduct = null;
    private Map<String, Product> inventory = new HashMap<>();

    public VendingMachine() {
        // TODO: Initialize states and load inventory
    }

    // Delegates to current state
    public void insertMoney(double amount) { currentState.insertMoney(amount); }
    public void selectProduct(String code) { currentState.selectProduct(code); }
    public void dispenseProduct() { currentState.dispenseProduct(); }
    public void cancel() { currentState.cancel(); }

    // State transition methods
    public void setState(VendingMachineState state) { this.currentState = state; }
    // TODO: Add getters/setters for inventory, insertedAmount, etc.
}

class Product {
    private String code, name;
    private double price;
    private int quantity;
    // TODO: Implement
}

class IdleState implements VendingMachineState {
    private VendingMachine machine;
    public IdleState(VendingMachine machine) { this.machine = machine; }

    @Override
    public void insertMoney(double amount) {
        // TODO: Accept money, transition to HasMoneyState
    }
    @Override
    public void selectProduct(String code) {
        System.out.println("Please insert money first");
    }
    @Override public void dispenseProduct() { System.out.println("Please insert money first"); }
    @Override public void cancel() { System.out.println("Nothing to cancel"); }
}

// TODO: Implement HasMoneyState, DispensingState, OutOfStockState`,
      cpp: `#include <iostream>
#include <map>
#include <string>
using namespace std;

class VendingMachine;

class VendingMachineState {
public:
    virtual void insertMoney(double amount) = 0;
    virtual void selectProduct(string code) = 0;
    virtual void dispenseProduct() = 0;
    virtual void cancel() = 0;
    virtual ~VendingMachineState() = default;
};

class Product {
public:
    string code, name;
    double price;
    int quantity;
};

class VendingMachine {
private:
    VendingMachineState* currentState;
    double insertedAmount = 0;
    string selectedProduct;
    map<string, Product> inventory;
public:
    VendingMachine();
    void insertMoney(double amount) { currentState->insertMoney(amount); }
    void selectProduct(string code) { currentState->selectProduct(code); }
    void dispenseProduct() { currentState->dispenseProduct(); }
    void cancel() { currentState->cancel(); }
    void setState(VendingMachineState* state) { currentState = state; }
    // TODO: Add accessors
};`,
      javascript: `class VendingMachine {
  constructor() {
    this.inventory = new Map(); // code -> { name, price, quantity }
    this.insertedAmount = 0;
    this.selectedProduct = null;

    // States
    this.idleState = new IdleState(this);
    this.hasMoneyState = new HasMoneyState(this);
    this.dispensingState = new DispensingState(this);

    this.currentState = this.idleState;

    // Load some products
    this.inventory.set('A1', { name: 'Cola', price: 1.50, quantity: 10 });
    this.inventory.set('A2', { name: 'Chips', price: 1.25, quantity: 5 });
    this.inventory.set('A3', { name: 'Water', price: 1.00, quantity: 8 });
  }

  insertMoney(amount) { this.currentState.insertMoney(amount); }
  selectProduct(code) { this.currentState.selectProduct(code); }
  dispenseProduct() { this.currentState.dispenseProduct(); }
  cancel() { this.currentState.cancel(); }
  setState(state) { this.currentState = state; }
}

class IdleState {
  constructor(machine) { this.machine = machine; }
  insertMoney(amount) { /* TODO: Accept money, go to HasMoneyState */ }
  selectProduct() { console.log('Insert money first'); }
  dispenseProduct() { console.log('Insert money first'); }
  cancel() { console.log('Nothing to cancel'); }
}

class HasMoneyState {
  constructor(machine) { this.machine = machine; }
  insertMoney(amount) { /* TODO: Add more money */ }
  selectProduct(code) { /* TODO: Check product exists, check funds */ }
  dispenseProduct() { /* TODO: Give product and change */ }
  cancel() { /* TODO: Return money */ }
}

class DispensingState {
  constructor(machine) { this.machine = machine; }
  insertMoney() { console.log('Please wait, dispensing...'); }
  selectProduct() { console.log('Please wait, dispensing...'); }
  dispenseProduct() { /* TODO: Physical dispensing, go back to Idle */ }
  cancel() { console.log('Cannot cancel during dispensing'); }
}`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Insert money and get product",
        input: "Insert $2, select Cola ($1.50)",
        expectedOutput: "Product dispensed, $0.50 change returned",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Cannot select product without money",
        input: "Select product without inserting money",
        expectedOutput: "Error: Insert money first",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Cancel returns inserted money",
        input: "Insert $5, then cancel",
        expectedOutput: "$5 returned",
        isHidden: false,
      },
      {
        id: "tc4",
        description: "Insufficient money rejects selection",
        input: "Insert $1, select $1.50 product",
        expectedOutput: "Insufficient funds",
        isHidden: false,
      },
    ],
  },
  {
    id: "4",
    slug: "design-elevator-system",
    title: "Design an Elevator System",
    difficulty: "Hard",
    category: "State Machines",
    tags: ["State", "Strategy", "Observer"],
    order: 4,
    description: `## Problem Statement

Design an elevator system for a building that:

- Manages multiple elevators
- Dispatches elevators to floors based on requests
- Handles both internal (inside elevator) and external (floor) button presses
- Minimizes wait time using a scheduling algorithm

## Design Requirements

**Key Entities:**
- \`ElevatorSystem\` — Central controller (Singleton)
- \`Elevator\` — Has state, direction, current floor
- \`ElevatorCar\` — Physical cab with buttons and display
- \`Floor\` — Has up/down call buttons
- \`Request\` — Internal (go to floor X) or external (call from floor Y)
- \`Dispatcher\` — Algorithm that assigns elevators to requests

**Elevator States:** Idle, Moving Up, Moving Down, Door Open

**Key Behaviors:**
- \`callElevator(floor, direction)\` — External request from a floor
- \`selectFloor(elevatorId, floor)\` — Internal request inside elevator
- Dispatcher should use SCAN algorithm (elevator serves floors in one direction before reversing)`,
    constraints: `- Building has 1–50 floors
- 1–8 elevators per building
- Each elevator has a max capacity
- Door stays open for 3 seconds
- Elevator moves at 1 floor/second
- SCAN scheduling: serve all requests in current direction before reversing`,
    hints: [
      "Model elevator states as enums: IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN",
      "Each elevator maintains a sorted set of target floors to visit",
      "SCAN: if moving up, serve all floors >= current in ascending order, then reverse",
      "Observer pattern: floors observe elevator positions to update displays",
      "The dispatcher picks the nearest idle elevator or the one already heading toward the request floor",
    ],
    starterCode: {
      java: `import java.util.*;

enum Direction { UP, DOWN, IDLE }
enum ElevatorState { IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN }

public class ElevatorSystem {
    private static ElevatorSystem instance;
    private List<Elevator> elevators;
    private int numFloors;

    private ElevatorSystem(int floors, int numElevators) {
        this.numFloors = floors;
        this.elevators = new ArrayList<>();
        for (int i = 0; i < numElevators; i++) {
            elevators.add(new Elevator(i, floors));
        }
    }

    public static ElevatorSystem getInstance(int floors, int numElevators) {
        if (instance == null) instance = new ElevatorSystem(floors, numElevators);
        return instance;
    }

    public void callElevator(int floor, Direction direction) {
        // TODO: Dispatch nearest/best elevator
    }

    public void selectFloor(int elevatorId, int floor) {
        // TODO: Add floor to elevator's queue
    }

    private Elevator findBestElevator(int floor, Direction direction) {
        // TODO: SCAN algorithm — find best elevator
        return null;
    }
}

class Elevator {
    private int id;
    private int currentFloor;
    private ElevatorState state;
    private Direction direction;
    private TreeSet<Integer> upQueue;   // floors to visit going up
    private TreeSet<Integer> downQueue; // floors to visit going down

    public Elevator(int id, int totalFloors) {
        this.id = id;
        this.currentFloor = 1;
        this.state = ElevatorState.IDLE;
        this.direction = Direction.IDLE;
        this.upQueue = new TreeSet<>();
        this.downQueue = new TreeSet<>(Comparator.reverseOrder());
    }

    public void addRequest(int floor) {
        // TODO: Add to appropriate queue
    }

    public void step() {
        // TODO: Move one floor, open door if target, update state
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <set>
using namespace std;

enum class Direction { UP, DOWN, IDLE };
enum class ElevatorState { IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN };

class Elevator {
public:
    int id, currentFloor;
    ElevatorState state;
    Direction direction;
    set<int> upQueue;
    set<int, greater<int>> downQueue;

    Elevator(int id) : id(id), currentFloor(1), state(ElevatorState::IDLE), direction(Direction::IDLE) {}

    void addRequest(int floor) {
        // TODO
    }

    void step() {
        // TODO: Simulate one time step
    }
};

class ElevatorSystem {
private:
    static ElevatorSystem* instance;
    vector<Elevator> elevators;
    int numFloors;
    ElevatorSystem(int floors, int n) : numFloors(floors) {
        for (int i = 0; i < n; i++) elevators.emplace_back(i);
    }
public:
    static ElevatorSystem* getInstance(int floors, int n) {
        if (!instance) instance = new ElevatorSystem(floors, n);
        return instance;
    }
    void callElevator(int floor, Direction dir) { /* TODO */ }
    void selectFloor(int elevId, int floor) { /* TODO */ }
};`,
      javascript: `class Direction {
  static UP = 'UP';
  static DOWN = 'DOWN';
  static IDLE = 'IDLE';
}

class ElevatorState {
  static IDLE = 'IDLE';
  static MOVING_UP = 'MOVING_UP';
  static MOVING_DOWN = 'MOVING_DOWN';
  static DOOR_OPEN = 'DOOR_OPEN';
}

class Elevator {
  constructor(id, totalFloors) {
    this.id = id;
    this.currentFloor = 1;
    this.state = ElevatorState.IDLE;
    this.direction = Direction.IDLE;
    this.upQueue = new Set();   // floors above
    this.downQueue = new Set(); // floors below
    this.totalFloors = totalFloors;
  }

  addRequest(floor) {
    // TODO: Add to correct queue based on floor vs current
  }

  step() {
    // TODO: Move one floor, open door if at target
  }

  getStatus() {
    return \`Elevator \${this.id}: Floor \${this.currentFloor}, \${this.state}\`;
  }
}

class ElevatorSystem {
  constructor(numFloors, numElevators) {
    this.numFloors = numFloors;
    this.elevators = Array.from({ length: numElevators }, (_, i) => new Elevator(i, numFloors));
  }

  callElevator(floor, direction) {
    // TODO: Find best elevator and dispatch
  }

  selectFloor(elevatorId, floor) {
    // TODO: Add floor to elevator's queue
  }

  findBestElevator(floor, direction) {
    // TODO: Find nearest idle, or elevator heading toward floor
    return null;
  }
}`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Elevator dispatched to requested floor",
        input: "callElevator(5, UP) with idle elevator at floor 1",
        expectedOutput: "Elevator dispatched, moves toward floor 5",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Elevator serves multiple floors in order",
        input: "Select floors 3, 7, 5 from inside elevator at floor 1",
        expectedOutput: "Visits: 3, 5, 7 (SCAN order)",
        isHidden: false,
      },
    ],
  },
  {
    id: "5",
    slug: "design-atm-system",
    title: "Design an ATM System",
    difficulty: "Medium",
    category: "Financial Systems",
    tags: ["State", "Singleton", "Chain of Responsibility"],
    order: 5,
    description: `## Problem Statement

Design an ATM (Automated Teller Machine) system that supports:

- Card insertion and PIN verification
- Balance inquiry
- Cash withdrawal with denomination management
- Deposit
- Transaction history

## Design Requirements

**Key Entities:**
- \`ATM\` — Main controller (Singleton)
- \`Card\` — Bank card with card number
- \`Account\` — Bank account with balance
- \`CashDispenser\` — Manages cash denominations (Chain of Responsibility)
- \`ATMState\` — Idle, CardInserted, Authenticated, TransactionInProgress

**Key Behaviors:**
- \`insertCard(card)\` → validates card
- \`enterPin(pin)\` → authenticates (3 attempts before lockout)
- \`withdraw(amount)\` → dispenses cash if sufficient balance and denominations available
- \`deposit(amount)\` → adds to balance
- \`checkBalance()\` → returns current balance`,
    constraints: `- PIN has exactly 4 digits; 3 failed attempts locks the card
- ATM holds denominations: $100, $50, $20, $10, $5, $1
- Minimum withdrawal: $20, maximum: $1000 per transaction
- Must use minimum number of bills
- Transaction timeout: 30 seconds of inactivity`,
    hints: [
      "State pattern for ATM phases: Idle → CardInserted → Authenticated → TransactionInProgress",
      "Chain of Responsibility for cash dispensing: $100 handler → $50 handler → ... → $1 handler",
      "Each denomination handler dispenses as many bills as possible, passes remainder to next",
      "Keep a map of denomination → count in the CashDispenser",
      "Lock the card in Account object, not in ATM — the bank owns card status",
    ],
    starterCode: {
      java: `import java.util.*;

public class ATM {
    private static ATM instance;
    private ATMState currentState;
    private Card currentCard;
    private Account currentAccount;
    private CashDispenser cashDispenser;

    private ATM() {
        this.cashDispenser = new CashDispenser();
        this.currentState = new IdleState(this);
        // Initialize with cash
        cashDispenser.loadCash(100, 10);
        cashDispenser.loadCash(50, 20);
        cashDispenser.loadCash(20, 50);
    }

    public static ATM getInstance() {
        if (instance == null) instance = new ATM();
        return instance;
    }

    public void insertCard(Card card) { currentState.insertCard(card); }
    public void enterPin(String pin) { currentState.enterPin(pin); }
    public void withdraw(double amount) { currentState.withdraw(amount); }
    public void deposit(double amount) { currentState.deposit(amount); }
    public void checkBalance() { currentState.checkBalance(); }
    public void ejectCard() { currentState.ejectCard(); }
}

interface ATMState {
    void insertCard(Card card);
    void enterPin(String pin);
    void withdraw(double amount);
    void deposit(double amount);
    void checkBalance();
    void ejectCard();
}

class Card {
    private String cardNumber;
    private String pin;
    private boolean isBlocked;
    private int failedAttempts;
    // TODO: Implement
}

class Account {
    private String id;
    private double balance;
    private List<String> transactionHistory;
    // TODO: Implement
}

class CashDispenser {
    private Map<Integer, Integer> cashMap = new TreeMap<>(Comparator.reverseOrder());

    public void loadCash(int denomination, int count) {
        cashMap.merge(denomination, count, Integer::sum);
    }

    public Map<Integer, Integer> dispenseCash(double amount) {
        // TODO: Use greedy to dispense minimum bills
        return null;
    }
}

// TODO: Implement IdleState, CardInsertedState, AuthenticatedState`,
      cpp: `#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

class ATM;
class Card;
class Account;

class ATMState {
public:
    virtual void insertCard(Card* card) = 0;
    virtual void enterPin(string pin) = 0;
    virtual void withdraw(double amount) = 0;
    virtual void deposit(double amount) = 0;
    virtual void checkBalance() = 0;
    virtual ~ATMState() = default;
};

class Card {
public:
    string cardNumber, pin;
    bool isBlocked = false;
    int failedAttempts = 0;
};

class Account {
public:
    string id;
    double balance;
    vector<string> history;
};

class CashDispenser {
    map<int, int, greater<int>> cashMap;
public:
    void loadCash(int denom, int count) { cashMap[denom] += count; }
    map<int,int> dispenseCash(double amount) {
        // TODO: Greedy dispense
        return {};
    }
};

class ATM {
    static ATM* instance;
    ATMState* currentState;
    CashDispenser dispenser;
    ATM();
public:
    static ATM* getInstance();
    void insertCard(Card* c);
    void enterPin(string pin);
    void withdraw(double amount);
    void checkBalance();
};`,
      javascript: `class ATM {
  constructor() {
    this.cashDispenser = new CashDispenser();
    this.currentState = new IdleState(this);
    this.currentCard = null;
    this.currentAccount = null;

    // Load initial cash
    this.cashDispenser.load(100, 10);
    this.cashDispenser.load(50, 20);
    this.cashDispenser.load(20, 50);
    this.cashDispenser.load(10, 100);
  }

  insertCard(card) { this.currentState.insertCard(card); }
  enterPin(pin) { this.currentState.enterPin(pin); }
  withdraw(amount) { this.currentState.withdraw(amount); }
  deposit(amount) { this.currentState.deposit(amount); }
  checkBalance() { this.currentState.checkBalance(); }
  ejectCard() { this.currentState.ejectCard(); }
  setState(state) { this.currentState = state; }
}

class CashDispenser {
  constructor() {
    this.cash = new Map(); // denomination -> count, sorted desc
  }
  load(denomination, count) {
    this.cash.set(denomination, (this.cash.get(denomination) || 0) + count);
  }
  dispense(amount) {
    // TODO: Greedy — use largest bills first
    const bills = {};
    const denoms = [...this.cash.keys()].sort((a, b) => b - a);
    let remaining = amount;
    for (const denom of denoms) {
      const available = this.cash.get(denom);
      const needed = Math.floor(remaining / denom);
      const use = Math.min(needed, available);
      if (use > 0) {
        bills[denom] = use;
        remaining -= use * denom;
        this.cash.set(denom, available - use);
      }
    }
    if (remaining > 0) return null; // Cannot make exact amount
    return bills;
  }
}

class IdleState {
  constructor(atm) { this.atm = atm; }
  insertCard(card) { /* TODO: Validate card, go to CardInsertedState */ }
  enterPin() { console.log('Please insert card first'); }
  withdraw() { console.log('Please insert card first'); }
  deposit() { console.log('Please insert card first'); }
  checkBalance() { console.log('Please insert card first'); }
  ejectCard() { console.log('No card inserted'); }
}

// TODO: Implement CardInsertedState, AuthenticatedState`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Successful withdrawal",
        input: "Insert card, enter correct PIN, withdraw $200",
        expectedOutput: "Cash dispensed: 2x$100",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Card locked after 3 wrong PINs",
        input: "Insert card, enter wrong PIN 3 times",
        expectedOutput: "Card blocked",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Balance check returns correct amount",
        input: "Authenticate then checkBalance()",
        expectedOutput: "Current balance displayed",
        isHidden: false,
      },
    ],
  },
  {
    id: "6",
    slug: "design-tic-tac-toe",
    title: "Design a Tic Tac Toe Game",
    difficulty: "Easy",
    category: "Games",
    tags: ["Strategy", "Observer"],
    order: 6,
    description: `## Problem Statement

Design a Tic Tac Toe game system that supports:

- Two human players (or one human vs. AI)
- N×N board (default 3×3, extendable)
- Win detection (row, column, diagonal)
- Draw detection
- Game reset

## Design Requirements

**Key Entities:**
- \`Game\` — Controls game flow
- \`Board\` — N×N grid
- \`Player\` — Human or AI player
- \`Move\` — A position (row, col)
- \`GameStatus\` — InProgress, Win, Draw

**Key Behaviors:**
- \`makeMove(player, row, col)\` → applies move, returns GameStatus
- \`isWinner(player)\` → checks if player has won
- \`isDraw()\` → board is full without winner
- \`reset()\` → clears board for new game`,
    constraints: `- Board size N is 3–10
- Win requires N in a row (same as board size)
- A cell can only be claimed once
- Players alternate turns — enforce turn order
- Support both 2-player and player vs AI modes`,
    hints: [
      "Board can be a 2D char array or int[][] where 0=empty, 1=playerX, 2=playerO",
      "Win check: iterate rows, columns, and 2 diagonals — O(N) per check",
      "Strategy pattern for AI: RandomAI, MinimaxAI both implement same PlayerStrategy interface",
      "Observer: notify UI/display when game state changes",
      "Keep a moveCount to quickly detect draw (moveCount == N*N without winner)",
    ],
    starterCode: {
      java: `import java.util.*;

enum Mark { EMPTY, X, O }
enum GameStatus { IN_PROGRESS, X_WINS, O_WINS, DRAW }

public class TicTacToe {
    private Board board;
    private Player[] players;
    private int currentPlayerIndex;
    private int moveCount;

    public TicTacToe(int boardSize) {
        this.board = new Board(boardSize);
        this.players = new Player[]{
            new Player("Player 1", Mark.X),
            new Player("Player 2", Mark.O)
        };
        this.currentPlayerIndex = 0;
    }

    public GameStatus makeMove(int row, int col) {
        Player current = players[currentPlayerIndex];

        if (!board.isValidMove(row, col)) {
            throw new IllegalArgumentException("Invalid move");
        }

        board.placeMark(row, col, current.getMark());
        moveCount++;

        if (board.checkWinner(current.getMark())) {
            return current.getMark() == Mark.X ? GameStatus.X_WINS : GameStatus.O_WINS;
        }

        if (moveCount == board.getSize() * board.getSize()) {
            return GameStatus.DRAW;
        }

        currentPlayerIndex = 1 - currentPlayerIndex;
        return GameStatus.IN_PROGRESS;
    }

    public void reset() {
        board.reset();
        moveCount = 0;
        currentPlayerIndex = 0;
    }

    public String getBoardDisplay() {
        return board.toString();
    }
}

class Board {
    private Mark[][] grid;
    private int size;

    public Board(int size) {
        this.size = size;
        this.grid = new Mark[size][size];
        reset();
    }

    public void reset() {
        for (Mark[] row : grid) Arrays.fill(row, Mark.EMPTY);
    }

    public boolean isValidMove(int row, int col) {
        return row >= 0 && row < size && col >= 0 && col < size
               && grid[row][col] == Mark.EMPTY;
    }

    public void placeMark(int row, int col, Mark mark) {
        grid[row][col] = mark;
    }

    public boolean checkWinner(Mark mark) {
        // TODO: Check rows, columns, diagonals
        return false;
    }

    public int getSize() { return size; }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (Mark[] row : grid) {
            for (Mark cell : row) {
                sb.append(cell == Mark.EMPTY ? "." : cell.name()).append(" ");
            }
            sb.append("\\n");
        }
        return sb.toString();
    }
}

class Player {
    private String name;
    private Mark mark;
    public Player(String name, Mark mark) { this.name = name; this.mark = mark; }
    public Mark getMark() { return mark; }
    public String getName() { return name; }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

enum class Mark { EMPTY, X, O };
enum class GameStatus { IN_PROGRESS, X_WINS, O_WINS, DRAW };

class Board {
    vector<vector<Mark>> grid;
    int size;
public:
    Board(int n) : size(n), grid(n, vector<Mark>(n, Mark::EMPTY)) {}

    bool isValidMove(int r, int c) {
        return r >= 0 && r < size && c >= 0 && c < size && grid[r][c] == Mark::EMPTY;
    }

    void placeMark(int r, int c, Mark m) { grid[r][c] = m; }

    bool checkWinner(Mark m) {
        // TODO: Check all rows, cols, diagonals
        return false;
    }

    bool isFull() {
        for (auto& row : grid)
            for (auto& cell : row)
                if (cell == Mark::EMPTY) return false;
        return true;
    }

    int getSize() { return size; }
};

class TicTacToe {
    Board board;
    int currentPlayer; // 0 = X, 1 = O
    int moveCount;
public:
    TicTacToe(int n = 3) : board(n), currentPlayer(0), moveCount(0) {}

    GameStatus makeMove(int row, int col) {
        // TODO
        return GameStatus::IN_PROGRESS;
    }

    void reset() {
        board = Board(board.getSize());
        currentPlayer = 0;
        moveCount = 0;
    }
};`,
      javascript: `class Mark {
  static EMPTY = 'EMPTY';
  static X = 'X';
  static O = 'O';
}

class GameStatus {
  static IN_PROGRESS = 'IN_PROGRESS';
  static X_WINS = 'X_WINS';
  static O_WINS = 'O_WINS';
  static DRAW = 'DRAW';
}

class Board {
  constructor(size = 3) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(Mark.EMPTY));
  }

  isValidMove(row, col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size
      && this.grid[row][col] === Mark.EMPTY;
  }

  placeMark(row, col, mark) {
    this.grid[row][col] = mark;
  }

  checkWinner(mark) {
    const n = this.size;
    const g = this.grid;
    // Check rows
    for (let r = 0; r < n; r++)
      if (g[r].every(c => c === mark)) return true;
    // Check cols
    for (let c = 0; c < n; c++)
      if (g.every(r => r[c] === mark)) return true;
    // Check main diagonal
    if (Array.from({length:n},(_,i)=>g[i][i]).every(c=>c===mark)) return true;
    // Check anti-diagonal
    if (Array.from({length:n},(_,i)=>g[i][n-1-i]).every(c=>c===mark)) return true;
    return false;
  }

  isFull() {
    return this.grid.every(row => row.every(c => c !== Mark.EMPTY));
  }

  reset() {
    this.grid = Array.from({ length: this.size }, () => Array(this.size).fill(Mark.EMPTY));
  }

  display() {
    return this.grid.map(row => row.map(c => c === Mark.EMPTY ? '.' : c).join(' ')).join('\n');
  }
}

class TicTacToe {
  constructor(size = 3) {
    this.board = new Board(size);
    this.players = [Mark.X, Mark.O];
    this.currentIndex = 0;
    this.moveCount = 0;
  }

  get currentPlayer() { return this.players[this.currentIndex]; }

  makeMove(row, col) {
    if (!this.board.isValidMove(row, col)) throw new Error('Invalid move');

    this.board.placeMark(row, col, this.currentPlayer);
    this.moveCount++;

    if (this.board.checkWinner(this.currentPlayer)) {
      return this.currentPlayer === Mark.X ? GameStatus.X_WINS : GameStatus.O_WINS;
    }
    if (this.board.isFull()) return GameStatus.DRAW;

    this.currentIndex = 1 - this.currentIndex;
    return GameStatus.IN_PROGRESS;
  }

  reset() {
    this.board.reset();
    this.currentIndex = 0;
    this.moveCount = 0;
  }
}`,
    },
    solution: {
      java: `// The JavaScript solution above is nearly complete — checkWinner needs row/col/diagonal checks`,
      cpp: `// Reference solution available after submission`,
      javascript: `// The JavaScript starter code is nearly complete — submit to see full reference`,
    },
    testCases: [
      {
        id: "tc1",
        description: "X wins by filling a row",
        input: "X plays (0,0),(0,1),(0,2) — O plays (1,0),(1,1)",
        expectedOutput: "X_WINS",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Game ends in draw",
        input: "Fill all 9 cells with no winner",
        expectedOutput: "DRAW",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Cannot play in occupied cell",
        input: "Play (0,0) twice",
        expectedOutput: "Exception: Invalid move",
        isHidden: false,
      },
      {
        id: "tc4",
        description: "X wins via diagonal",
        input: "X plays (0,0),(1,1),(2,2)",
        expectedOutput: "X_WINS",
        isHidden: false,
      },
    ],
  },
  {
    id: "7",
    slug: "design-blackjack",
    title: "Design a Blackjack Game",
    difficulty: "Medium",
    category: "Games",
    tags: ["Strategy", "Observer", "Factory"],
    order: 7,
    description: `## Problem Statement

Design a Blackjack card game system that supports:

- Multiple players at a table
- Standard Blackjack rules (hit, stand, double down, split)
- Dealer AI following house rules (must hit on 16 or less)
- Betting system
- Deck management with shuffling

## Design Requirements

**Key Entities:**
- \`Card\` — Suit + Rank, knows its Blackjack value
- \`Deck\` / \`Shoe\` — One or multiple decks, shuffled
- \`Hand\` — A player's current cards, calculates total with Ace handling
- \`Player\` — Human player with chips/bet
- \`Dealer\` — Follows house rules automatically
- \`BlackjackGame\` — Game controller

**Key Behaviors:**
- \`dealInitialCards()\` — 2 cards to each player and dealer
- \`hit(player)\` — Deal one more card to player
- \`stand(player)\` — Player ends their turn
- \`evaluateWinners()\` — Compare all hands to dealer, distribute chips`,
    constraints: `- Use 6 decks shuffled together (standard casino)
- Ace is 11 unless it causes bust, then 1
- Dealer stands on 17+, hits on 16 or less
- Blackjack (Ace + 10-value on deal) pays 3:2
- Bust (> 21) is an automatic loss
- Support 1–7 players at a table`,
    hints: [
      "Card value is fixed for most ranks (2→2, King→10), but Ace is special — track count of aces separately",
      "Hand.getTotal() should subtract 10 for each ace if total > 21 and you have aces counting as 11",
      "Shoe extends Deck — contains N×52 cards, reshuffles when 75% depleted",
      "Dealer is a special Player subclass that overrides takeTurn() to follow house rules",
      "Use Observer to notify UI: onCardDealt, onPlayerBust, onGameOver",
    ],
    starterCode: {
      java: `import java.util.*;

enum Suit { HEARTS, DIAMONDS, CLUBS, SPADES }
enum Rank { TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING, ACE }

class Card {
    private Suit suit;
    private Rank rank;

    public Card(Suit suit, Rank rank) {
        this.suit = suit;
        this.rank = rank;
    }

    public int getValue() {
        // TODO: Return card value (ACE returns 11, face cards return 10)
        return 0;
    }

    @Override
    public String toString() {
        return rank + " of " + suit;
    }
}

class Hand {
    private List<Card> cards = new ArrayList<>();

    public void addCard(Card card) { cards.add(card); }

    public int getTotal() {
        // TODO: Sum card values, handle Ace (11 or 1)
        return 0;
    }

    public boolean isBust() { return getTotal() > 21; }
    public boolean isBlackjack() { return cards.size() == 2 && getTotal() == 21; }
    public List<Card> getCards() { return cards; }
    public void clear() { cards.clear(); }
}

class Deck {
    protected List<Card> cards = new ArrayList<>();

    public Deck() {
        for (Suit suit : Suit.values())
            for (Rank rank : Rank.values())
                cards.add(new Card(suit, rank));
    }

    public void shuffle() { Collections.shuffle(cards); }

    public Card deal() {
        if (cards.isEmpty()) throw new RuntimeException("Deck is empty");
        return cards.remove(cards.size() - 1);
    }
}

class Player {
    protected String name;
    protected Hand hand;
    protected int chips;
    protected int currentBet;

    public Player(String name, int chips) {
        this.name = name;
        this.chips = chips;
        this.hand = new Hand();
    }

    public void placeBet(int amount) {
        if (amount > chips) throw new IllegalArgumentException("Not enough chips");
        currentBet = amount;
        chips -= amount;
    }

    // TODO: Add getters
}

public class BlackjackGame {
    private List<Player> players;
    private Player dealer;
    private Deck deck;

    public BlackjackGame(List<String> playerNames) {
        // TODO: Initialize players, dealer, deck (6 decks)
    }

    public void dealInitialCards() {
        // TODO: 2 cards to each player + dealer
    }

    public void hit(Player player) {
        // TODO: Deal one card to player
    }

    public void stand(Player player) {
        // TODO: Mark player as done
    }

    public void playDealerTurn() {
        // TODO: Dealer hits until 17+
    }

    public Map<Player, String> evaluateWinners() {
        // TODO: Compare each player to dealer, return win/lose/push
        return new HashMap<>();
    }
}`,
      cpp: `// See Java starter code for structure`,
      javascript: `// See Java starter code for structure — implement in JavaScript`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Blackjack detected on initial deal",
        input: "Deal Ace + King to player",
        expectedOutput: "isBlackjack() == true, total == 21",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Ace counts as 1 to avoid bust",
        input: "Hand: Ace, 5, 9 → total should be 15 not 25",
        expectedOutput: "15",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Dealer hits until 17",
        input: "Dealer has 16, must hit",
        expectedOutput: "Dealer draws card",
        isHidden: false,
      },
    ],
  },
  {
    id: "8",
    slug: "design-unix-file-search",
    title: "Design a Unix File Search System",
    difficulty: "Medium",
    category: "File Systems",
    tags: ["Composite", "Chain of Responsibility", "Builder"],
    order: 8,
    description: `## Problem Statement

Design a Unix-like \`find\` command system that can search for files based on multiple criteria:

- Search by name (exact or pattern with wildcards)
- Search by size (greater than, less than, equal to)
- Search by extension
- Search by date modified
- Combine criteria with AND/OR logic

## Design Requirements

**Key Entities:**
- \`File\` / \`Directory\` — Composite pattern (both are "FileSystemNode")
- \`Filter\` — Interface for search criteria
- \`NameFilter\`, \`SizeFilter\`, \`ExtensionFilter\`, \`DateFilter\`
- \`AndFilter\`, \`OrFilter\` — Combine multiple filters
- \`FileSearcher\` — Traverses the tree applying filters

**Example Usage:**
\`\`\`java
Filter f = new AndFilter(
    new ExtensionFilter("java"),
    new SizeFilter(1024, SizeFilter.GREATER_THAN)
);
List<File> results = searcher.search(rootDir, f);
\`\`\``,
    constraints: `- Directory tree can be deeply nested (up to 20 levels)
- Support wildcard matching: * (any chars) and ? (single char)
- Search must be recursive by default, with option to limit depth
- Results should be returned sorted by path
- Handle symlinks by not following them (avoid infinite loops)`,
    hints: [
      "Composite pattern: File and Directory both implement FileSystemNode with accept(Filter) method",
      "Chain of Responsibility: chain filters together, each decides pass/fail",
      "Builder pattern for constructing complex filter queries fluently",
      "For wildcard matching, convert pattern to regex: * → .*, ? → .",
      "DFS traversal with a depth counter for depth-limited search",
    ],
    starterCode: {
      java: `import java.util.*;
import java.time.*;

interface Filter {
    boolean matches(FileNode file);

    // Convenience combinator methods
    default Filter and(Filter other) { return new AndFilter(this, other); }
    default Filter or(Filter other) { return new OrFilter(this, other); }
}

abstract class FileNode {
    protected String name;
    protected long size;
    protected LocalDateTime lastModified;
    protected String path;

    public FileNode(String name, long size, String path) {
        this.name = name;
        this.size = size;
        this.path = path;
        this.lastModified = LocalDateTime.now();
    }

    public String getName() { return name; }
    public long getSize() { return size; }
    public String getPath() { return path; }
    public LocalDateTime getLastModified() { return lastModified; }
    public abstract boolean isDirectory();
}

class File extends FileNode {
    private String extension;

    public File(String name, long size, String path) {
        super(name, size, path);
        int dot = name.lastIndexOf('.');
        this.extension = dot >= 0 ? name.substring(dot + 1) : "";
    }

    public String getExtension() { return extension; }

    @Override
    public boolean isDirectory() { return false; }
}

class Directory extends FileNode {
    private List<FileNode> children = new ArrayList<>();

    public Directory(String name, String path) {
        super(name, 0, path);
    }

    public void add(FileNode node) { children.add(node); }
    public List<FileNode> getChildren() { return children; }

    @Override
    public boolean isDirectory() { return true; }
}

class NameFilter implements Filter {
    private String pattern;
    public NameFilter(String pattern) { this.pattern = pattern; }

    @Override
    public boolean matches(FileNode file) {
        // TODO: Support wildcards (* and ?)
        return file.getName().equals(pattern);
    }
}

class SizeFilter implements Filter {
    public enum Operator { GT, LT, EQ }
    private long size;
    private Operator op;

    public SizeFilter(long size, Operator op) {
        this.size = size;
        this.op = op;
    }

    @Override
    public boolean matches(FileNode file) {
        // TODO: Compare file size with operator
        return false;
    }
}

class ExtensionFilter implements Filter {
    private String extension;
    public ExtensionFilter(String extension) { this.extension = extension; }

    @Override
    public boolean matches(FileNode file) {
        if (file.isDirectory()) return false;
        return ((File) file).getExtension().equalsIgnoreCase(extension);
    }
}

class AndFilter implements Filter {
    private Filter left, right;
    public AndFilter(Filter left, Filter right) { this.left = left; this.right = right; }
    @Override
    public boolean matches(FileNode file) { return left.matches(file) && right.matches(file); }
}

class OrFilter implements Filter {
    private Filter left, right;
    public OrFilter(Filter left, Filter right) { this.left = left; this.right = right; }
    @Override
    public boolean matches(FileNode file) { return left.matches(file) || right.matches(file); }
}

public class FileSearcher {
    public List<FileNode> search(FileNode root, Filter filter) {
        // TODO: DFS traversal, collect matching files
        return new ArrayList<>();
    }

    public List<FileNode> search(FileNode root, Filter filter, int maxDepth) {
        // TODO: Depth-limited search
        return new ArrayList<>();
    }
}`,
      cpp: `// See Java starter code for structure`,
      javascript: `class FileNode {
  constructor(name, size, path) {
    this.name = name;
    this.size = size;
    this.path = path;
    this.lastModified = new Date();
  }
  isDirectory() { return false; }
  get extension() {
    const dot = this.name.lastIndexOf('.');
    return dot >= 0 ? this.name.slice(dot + 1) : '';
  }
}

class File extends FileNode {
  isDirectory() { return false; }
}

class Directory extends FileNode {
  constructor(name, path) {
    super(name, 0, path);
    this.children = [];
  }
  add(node) { this.children.push(node); }
  isDirectory() { return true; }
}

class NameFilter {
  constructor(pattern) { this.pattern = pattern; }
  matches(node) {
    // TODO: Support * and ? wildcards
    return node.name === this.pattern;
  }
}

class SizeFilter {
  constructor(size, op) { this.size = size; this.op = op; } // op: 'gt','lt','eq'
  matches(node) {
    if (this.op === 'gt') return node.size > this.size;
    if (this.op === 'lt') return node.size < this.size;
    return node.size === this.size;
  }
}

class ExtensionFilter {
  constructor(ext) { this.ext = ext; }
  matches(node) {
    return !node.isDirectory() && node.extension.toLowerCase() === this.ext.toLowerCase();
  }
}

class AndFilter {
  constructor(...filters) { this.filters = filters; }
  matches(node) { return this.filters.every(f => f.matches(node)); }
}

class OrFilter {
  constructor(...filters) { this.filters = filters; }
  matches(node) { return this.filters.some(f => f.matches(node)); }
}

class FileSearcher {
  search(root, filter, maxDepth = Infinity, depth = 0) {
    const results = [];
    if (depth > maxDepth) return results;

    if (!root.isDirectory() && filter.matches(root)) {
      results.push(root);
    }

    if (root.isDirectory()) {
      for (const child of root.children) {
        results.push(...this.search(child, filter, maxDepth, depth + 1));
      }
    }

    return results.sort((a, b) => a.path.localeCompare(b.path));
  }
}`,
    },
    solution: {
      java: `// The starter code is mostly complete. Key TODOs: implement NameFilter wildcards and FileSearcher DFS`,
      cpp: `// Reference solution available after submission`,
      javascript: `// The JavaScript starter code is complete — just implement wildcard matching in NameFilter`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Find all .java files",
        input: "search(root, new ExtensionFilter('java'))",
        expectedOutput: "Returns all .java files in tree",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Find files larger than 1KB",
        input: "search(root, new SizeFilter(1024, GT))",
        expectedOutput: "Returns files with size > 1024 bytes",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Combined AND filter",
        input: "ExtensionFilter('java').and(SizeFilter(500, GT))",
        expectedOutput: "Returns .java files larger than 500 bytes",
        isHidden: false,
      },
    ],
  },
  {
    id: "9",
    slug: "design-restaurant-management",
    title: "Design a Restaurant Management System",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Observer", "Factory", "State", "Strategy"],
    order: 9,
    description: `## Problem Statement

Design a restaurant management system that handles:

- Table management (reservation, seating, clearing)
- Menu management (items, categories, prices, availability)
- Order management (placing, modifying, tracking status)
- Kitchen workflow (order queue, item preparation)
- Billing (generate bill, apply discounts, split bill)
- Staff management (waiters, kitchen staff, manager)

## Design Requirements

**Key Entities:**
- \`Restaurant\` — Main system (Singleton)
- \`Table\` — Physical table with status
- \`MenuItem\` — Food/drink item with price and category
- \`Order\` — A table's order with multiple OrderItems
- \`OrderItem\` — A specific menu item with quantity
- \`Bill\` — Final bill with tax, discounts
- \`KitchenDisplay\` — Shows pending orders to kitchen (Observer)
- \`Waiter\`, \`Chef\` — Staff with roles

**Order Flow:**
SEATED → ORDER_PLACED → PREPARING → READY → SERVED → BILLED → CLEARED

**Key Behaviors:**
- \`seatCustomers(tableId, partySize)\` → assigns table
- \`placeOrder(tableId, items)\` → creates Order, notifies kitchen
- \`markItemReady(orderId, itemId)\` → kitchen marks item done
- \`generateBill(tableId)\` → calculates total with tax`,
    constraints: `- Restaurant has 5–50 tables of varying capacity (2, 4, 6, 8 seats)
- Menu has up to 100 items across 5 categories
- Multiple orders can be placed for the same table (e.g., refills, add-ons)
- Tax is 10%, optional service charge is 18%
- Support bill splitting by seat or equally
- Order status updates notify kitchen display (Observer)`,
    hints: [
      "State pattern for Table: AVAILABLE → OCCUPIED → NEEDS_CLEANING",
      "Observer: Order publishes status changes, KitchenDisplay subscribes",
      "Factory Method: BillFactory creates different bill types (individual, split, group)",
      "Strategy: DiscountStrategy interface — NoDiscount, PercentageDiscount, HappyHourDiscount",
      "Command pattern for order modifications: AddItemCommand, RemoveItemCommand (supports undo)",
    ],
    starterCode: {
      java: `import java.util.*;
import java.time.*;

enum TableStatus { AVAILABLE, OCCUPIED, RESERVED, NEEDS_CLEANING }
enum OrderStatus { PENDING, PREPARING, READY, SERVED, BILLED }

public class Restaurant {
    private static Restaurant instance;
    private List<Table> tables;
    private Map<String, MenuItem> menu;
    private Map<String, Order> activeOrders;
    private List<OrderObserver> observers;

    private Restaurant() {
        tables = new ArrayList<>();
        menu = new HashMap<>();
        activeOrders = new HashMap<>();
        observers = new ArrayList<>();
        initializeRestaurant();
    }

    public static Restaurant getInstance() {
        if (instance == null) instance = new Restaurant();
        return instance;
    }

    private void initializeRestaurant() {
        // TODO: Add tables and menu items
    }

    public Table seatCustomers(int partySize) {
        // TODO: Find available table with capacity >= partySize
        return null;
    }

    public Order placeOrder(String tableId, Map<String, Integer> items) {
        // TODO: Create order, add to kitchen queue, notify observers
        return null;
    }

    public void markItemReady(String orderId, String itemId) {
        // TODO: Mark item as ready, check if all items ready
    }

    public Bill generateBill(String tableId) {
        // TODO: Sum all orders for table, apply tax
        return null;
    }

    public void addObserver(OrderObserver observer) { observers.add(observer); }

    private void notifyObservers(Order order) {
        observers.forEach(o -> o.onOrderUpdate(order));
    }
}

interface OrderObserver {
    void onOrderUpdate(Order order);
}

class KitchenDisplay implements OrderObserver {
    @Override
    public void onOrderUpdate(Order order) {
        System.out.println("[KITCHEN] Order " + order.getId() + " status: " + order.getStatus());
    }
}

class Table {
    private String id;
    private int capacity;
    private TableStatus status;
    private List<Order> orders = new ArrayList<>();
    // TODO: Complete implementation
}

class MenuItem {
    private String id, name, category;
    private double price;
    private boolean available;
    // TODO: Complete implementation
}

class OrderItem {
    private MenuItem item;
    private int quantity;
    private boolean ready;
    // TODO: Complete implementation
}

class Order {
    private String id;
    private String tableId;
    private List<OrderItem> items;
    private OrderStatus status;
    private LocalDateTime placedAt;
    // TODO: Complete implementation
}

class Bill {
    private List<Order> orders;
    private double subtotal;
    private double tax;
    private double serviceCharge;
    private double total;

    public Bill(List<Order> orders) {
        // TODO: Calculate subtotal, apply tax (10%)
    }
}`,
      cpp: `// See Java starter code for architecture`,
      javascript: `// Implement Restaurant Management System in JavaScript
// Follow the Java structure above`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Seat customers and place order",
        input: "seatCustomers(4), placeOrder with 2 items",
        expectedOutput: "Table assigned, order created, kitchen notified",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Bill calculated correctly",
        input: "Order: Burger($12) + Fries($5), tax 10%",
        expectedOutput: "Total: $18.70",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Table unavailable when occupied",
        input: "seatCustomers() when all tables occupied",
        expectedOutput: "null or exception",
        isHidden: false,
      },
    ],
  },
  {
    id: "10",
    slug: "design-grocery-store",
    title: "Design a Grocery Store System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Observer", "Strategy", "Factory"],
    order: 10,
    description: `## Problem Statement

Design a grocery store checkout system that handles:

- Product catalog with categories and prices
- Shopping cart management
- Multiple checkout lanes (regular, self-checkout, express)
- Promotions and discounts (BOGO, percentage off, bulk discount)
- Loyalty points system
- Inventory management

## Design Requirements

**Key Entities:**
- \`Product\` — SKU, name, price, category, stock
- \`ShoppingCart\` — Holds CartItems, calculates totals
- \`CheckoutLane\` — Processes payment, applies discounts
- \`Promotion\` — Various discount strategies
- \`LoyaltyAccount\` — Tracks and redeems points
- \`Inventory\` — Manages stock levels, alerts on low stock

**Key Behaviors:**
- \`addToCart(productId, quantity)\` → adds to cart if in stock
- \`applyPromotion(promotionCode)\` → applies discount
- \`checkout(cart, paymentMethod)\` → processes sale, updates inventory
- \`getReceipt()\` → itemized receipt with discounts`,
    constraints: `- Product price precision: 2 decimal places
- Promotions: BOGO (buy one get one), 10-50% off, bulk (buy 3 get 20% off)
- Loyalty points: earn 1 point per $1 spent, redeem 100 points = $1
- Express lane: max 15 items
- Inventory alert when stock < 10 units`,
    hints: [
      "Strategy pattern for promotions: each discount type is a separate DiscountStrategy",
      "Observer: Inventory observes checkout events to update stock counts",
      "Cart should apply all applicable promotions and show original vs discounted price",
      "Factory for creating different lane types: RegularLane, ExpressLane, SelfCheckoutLane",
      "Separate concerns: Cart handles item management, CheckoutLane handles payment and receipts",
    ],
    starterCode: {
      java: `import java.util.*;

public class GroceryStore {
    private Map<String, Product> inventory;
    private List<CheckoutLane> lanes;
    private List<Promotion> activePromotions;

    public ShoppingCart createCart() {
        return new ShoppingCart();
    }

    public boolean addToCart(ShoppingCart cart, String productId, int quantity) {
        // TODO: Check inventory, add to cart
        return false;
    }

    public Receipt checkout(ShoppingCart cart, PaymentMethod payment) {
        // TODO: Apply promotions, process payment, update inventory
        return null;
    }
}

class Product {
    private String sku, name, category;
    private double price;
    private int stockCount;
    // TODO: Implement
}

interface DiscountStrategy {
    double apply(List<CartItem> items, Product product);
    String getDescription();
}

class BOGODiscount implements DiscountStrategy {
    @Override
    public double apply(List<CartItem> items, Product product) {
        // TODO: Buy one get one free
        return 0;
    }
    @Override
    public String getDescription() { return "Buy One Get One Free"; }
}

class PercentageDiscount implements DiscountStrategy {
    private double percentage;
    public PercentageDiscount(double pct) { this.percentage = pct; }
    @Override
    public double apply(List<CartItem> items, Product product) {
        // TODO: Apply percentage discount
        return 0;
    }
    @Override
    public String getDescription() { return percentage + "% off"; }
}

class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();

    public void addItem(Product product, int quantity) {
        // TODO: Add or update item
    }

    public double getSubtotal() {
        // TODO: Sum all items
        return 0;
    }

    public List<CartItem> getItems() { return items; }
}

class CartItem {
    private Product product;
    private int quantity;
    // TODO: Implement
}

enum PaymentMethod { CASH, CARD, MOBILE_PAY }

class Receipt {
    // TODO: Itemized receipt with discounts
}`,
      cpp: `// See Java starter code for structure`,
      javascript: `// Implement in JavaScript following Java structure`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Cart subtotal calculation",
        input: "Add 2x$5 + 3x$3 items",
        expectedOutput: "Subtotal: $19",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "BOGO discount applied",
        input: "Add 4 items with BOGO promotion",
        expectedOutput: "Pay for 2, get 2 free",
        isHidden: false,
      },
    ],
  },
  {
    id: "11",
    slug: "design-shipping-locker",
    title: "Design a Shipping Locker System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Strategy", "Observer", "Singleton"],
    order: 11,
    description: `## Problem Statement

Design an Amazon Locker-style shipping locker system that:

- Manages package delivery and pickup at locker stations
- Assigns packages to appropriately-sized lockers
- Sends access codes to recipients
- Handles package expiration (unclaimed packages)
- Manages multiple locker stations

## Design Requirements

**Key Entities:**
- \`LockerStation\` — A physical location with multiple lockers
- \`Locker\` — Individual locker with size and status
- \`Package\` — Has dimensions, weight, recipient
- \`Delivery\` — Assignment of package to locker
- \`AccessCode\` — Time-limited code sent to recipient
- \`NotificationService\` — Sends email/SMS notifications

**Key Behaviors:**
- \`assignLocker(package)\` → finds nearest available locker, generates access code
- \`pickupPackage(accessCode)\` → validates code, opens locker, marks as collected
- \`expireOldPackages()\` → returns unclaimed packages after 3 days`,
    constraints: `- Locker sizes: Small (< 1kg, < 30cm), Medium (< 5kg, < 60cm), Large (< 25kg, < 120cm)
- Access code is 6-digit numeric, expires in 72 hours
- Package must be picked up within 3 days or is returned to sender
- One package per locker at a time
- Locker station has 5–50 lockers of mixed sizes`,
    hints: [
      "Strategy pattern for locker assignment: NearestFirst, SmallestFitFirst",
      "Observer: package status changes trigger notifications",
      "Use a scheduled job (or simulate with expireOldPackages()) to check expiry",
      "AccessCode should store creation time for expiry validation",
      "Package → Delivery → Locker is a one-to-one relationship while in storage",
    ],
    starterCode: {
      java: `import java.util.*;
import java.time.*;

enum LockerSize { SMALL, MEDIUM, LARGE }
enum LockerStatus { AVAILABLE, OCCUPIED }
enum PackageStatus { IN_TRANSIT, DELIVERED, PICKED_UP, RETURNED }

class Package {
    private String id;
    private double weightKg;
    private double dimensionCm;
    private String recipientEmail;
    private PackageStatus status;

    public LockerSize getRequiredLockerSize() {
        // TODO: Return minimum locker size based on weight and dimension
        return LockerSize.LARGE;
    }
    // TODO: getters/setters
}

class Locker {
    private String id;
    private LockerSize size;
    private LockerStatus status;
    private Package currentPackage;

    public boolean canFit(Package pkg) {
        if (status != LockerStatus.AVAILABLE) return false;
        // TODO: Check size compatibility
        return false;
    }
    // TODO: assign(), release() methods
}

class AccessCode {
    private String code;
    private String lockerId;
    private String packageId;
    private LocalDateTime expiresAt;

    public AccessCode(String lockerId, String packageId) {
        this.code = String.format("%06d", new Random().nextInt(1000000));
        this.lockerId = lockerId;
        this.packageId = packageId;
        this.expiresAt = LocalDateTime.now().plusHours(72);
    }

    public boolean isValid() {
        return LocalDateTime.now().isBefore(expiresAt);
    }
}

class LockerStation {
    private String id;
    private String location;
    private List<Locker> lockers;

    public LockerStation(String id, String location) {
        this.id = id;
        this.location = location;
        this.lockers = new ArrayList<>();
    }

    public AccessCode deliverPackage(Package pkg) {
        // TODO: Find available locker, assign package, return access code
        return null;
    }

    public boolean pickupPackage(String accessCodeStr, Map<String, AccessCode> codeMap) {
        // TODO: Validate code, open locker, mark picked up
        return false;
    }

    public void expireOldPackages() {
        // TODO: Return packages with expired codes
    }
}

public class LockerSystem {
    private static LockerSystem instance;
    private List<LockerStation> stations;
    private Map<String, AccessCode> activeCodes = new HashMap<>();

    public static LockerSystem getInstance() {
        if (instance == null) instance = new LockerSystem();
        return instance;
    }

    public AccessCode deliverPackage(Package pkg, String preferredStationId) {
        // TODO: Route to preferred or nearest station
        return null;
    }

    public boolean pickup(String accessCode) {
        // TODO: Lookup code, delegate to station
        return false;
    }
}`,
      cpp: `// See Java starter code`,
      javascript: `// Implement in JavaScript`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Package assigned to correct size locker",
        input: "Deliver 0.5kg package to station",
        expectedOutput: "Assigned to SMALL locker, access code generated",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Valid access code allows pickup",
        input: "Use correct access code within 72 hours",
        expectedOutput: "Package picked up, locker available",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "Expired access code rejected",
        input: "Use access code after 72 hours",
        expectedOutput: "Code invalid/expired",
        isHidden: false,
      },
    ],
  },
  {
    id: "12",
    slug: "oop-fundamentals",
    title: "OOP Fundamentals — Design Review",
    difficulty: "Easy",
    category: "Fundamentals",
    tags: ["SOLID", "OOP"],
    order: 0,
    description: `## OOP Fundamentals for LLD Interviews

Before tackling design problems, master these foundational concepts:

### The 4 Pillars of OOP

**1. Encapsulation**
Hide internal state. Only expose what's necessary through a public interface.
\`\`\`java
class BankAccount {
    private double balance; // private — hidden
    public void deposit(double amount) { // controlled access
        if (amount > 0) balance += amount;
    }
}
\`\`\`

**2. Abstraction**
Hide complexity behind simple interfaces.
\`\`\`java
interface Shape {
    double area(); // I don't care HOW, just that it works
}
\`\`\`

**3. Inheritance**
\`IS-A\` relationship. Reuse and extend.
\`\`\`java
class Car extends Vehicle { ... } // Car IS-A Vehicle
\`\`\`

**4. Polymorphism**
Same interface, different behavior.
\`\`\`java
Shape s = new Circle(5);
s.area(); // calls Circle.area(), not Rectangle.area()
\`\`\`

---

### SOLID Principles

| Principle | Meaning | Violation Example |
|-----------|---------|-------------------|
| **S** — Single Responsibility | One class, one reason to change | \`UserManager\` handles auth, DB, and email |
| **O** — Open/Closed | Open for extension, closed for modification | Adding a new payment method requires editing existing class |
| **L** — Liskov Substitution | Subclass must be usable in place of parent | \`Square extends Rectangle\` breaks width/height independence |
| **I** — Interface Segregation | Don't force clients to implement unused methods | \`Animal\` interface has \`fly()\` but Fish implements it |
| **D** — Dependency Inversion | Depend on abstractions, not concretions | \`OrderService\` directly instantiates \`MySQLDatabase\` |

---

### Common Design Patterns in LLD Interviews

| Pattern | Type | Use When |
|---------|------|----------|
| Singleton | Creational | Only one instance needed (ParkingLot, ATM) |
| Factory | Creational | Create objects without specifying exact class |
| Observer | Behavioral | One-to-many event notifications |
| Strategy | Behavioral | Swap algorithms at runtime |
| State | Behavioral | Object behavior changes with internal state |
| Composite | Structural | Tree structures (File System) |
| Decorator | Structural | Add behavior without modifying class |

---

### Practice Exercise

Implement the following to test your understanding:`,
    constraints: `- Implement a Shape hierarchy with Circle, Rectangle, Triangle
- Each shape must implement area() and perimeter()
- Create a ShapeFactory that creates shapes by type string
- Demonstrate polymorphism by storing different shapes in a List<Shape>
- Ensure all shapes follow the Liskov Substitution Principle`,
    hints: [
      "abstract class vs interface: use interface when classes from different hierarchies need same behavior",
      "Override equals() and hashCode() together — if two objects are equal, they must have the same hash",
      "Favor composition over inheritance — 'has-a' is often more flexible than 'is-a'",
      "When in doubt in an interview, draw the class diagram first before writing code",
    ],
    starterCode: {
      java: `import java.util.*;

// TODO: Define Shape interface or abstract class
// Each shape should have: area(), perimeter(), toString()

// TODO: Implement Circle, Rectangle, Triangle

// TODO: Implement ShapeFactory
// ShapeFactory.create("circle", 5.0) → new Circle(5.0)
// ShapeFactory.create("rectangle", 4.0, 6.0) → new Rectangle(4.0, 6.0)

public class Main {
    public static void main(String[] args) {
        // TODO: Create mixed list of shapes, calculate total area
        List<Shape> shapes = new ArrayList<>();
        // Add shapes via factory...

        double totalArea = shapes.stream()
            .mapToDouble(Shape::area)
            .sum();

        System.out.println("Total area: " + totalArea);
        shapes.forEach(System.out::println);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <memory>
#include <cmath>
using namespace std;

// TODO: Define abstract Shape class with pure virtual area() and perimeter()

// TODO: Implement Circle, Rectangle, Triangle

// TODO: Implement ShapeFactory

int main() {
    vector<unique_ptr<Shape>> shapes;
    // Add shapes via factory...

    double totalArea = 0;
    for (auto& s : shapes) {
        totalArea += s->area();
        cout << s->toString() << endl;
    }
    cout << "Total area: " << totalArea << endl;
    return 0;
}`,
      javascript: `// TODO: Implement Shape hierarchy

class Shape {
  area() { throw new Error('area() must be implemented'); }
  perimeter() { throw new Error('perimeter() must be implemented'); }
  toString() { return \`\${this.constructor.name}: area=\${this.area().toFixed(2)}\`; }
}

// TODO: Implement Circle
class Circle extends Shape {
  constructor(radius) {
    super();
    // TODO
  }
}

// TODO: Implement Rectangle
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    // TODO
  }
}

// TODO: Implement Triangle
class Triangle extends Shape {
  constructor(a, b, c) { // sides
    super();
    // TODO: Use Heron's formula for area
  }
}

// TODO: Implement ShapeFactory
class ShapeFactory {
  static create(type, ...dimensions) {
    // TODO: Return correct shape based on type string
    throw new Error('Unknown shape: ' + type);
  }
}

// Test
const shapes = [
  ShapeFactory.create('circle', 5),
  ShapeFactory.create('rectangle', 4, 6),
  ShapeFactory.create('triangle', 3, 4, 5),
];

const totalArea = shapes.reduce((sum, s) => sum + s.area(), 0);
console.log('Total area:', totalArea.toFixed(2));
shapes.forEach(s => console.log(s.toString()));`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `class Shape {
  area() { throw new Error('Must implement'); }
  perimeter() { throw new Error('Must implement'); }
  toString() { return \`\${this.constructor.name}: area=\${this.area().toFixed(2)}, perimeter=\${this.perimeter().toFixed(2)}\`; }
}

class Circle extends Shape {
  constructor(radius) { super(); this.radius = radius; }
  area() { return Math.PI * this.radius ** 2; }
  perimeter() { return 2 * Math.PI * this.radius; }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; }
  perimeter() { return 2 * (this.w + this.h); }
}

class Triangle extends Shape {
  constructor(a, b, c) { super(); this.a = a; this.b = b; this.c = c; }
  area() {
    const s = (this.a + this.b + this.c) / 2;
    return Math.sqrt(s * (s-this.a) * (s-this.b) * (s-this.c));
  }
  perimeter() { return this.a + this.b + this.c; }
}

class ShapeFactory {
  static create(type, ...dims) {
    switch(type.toLowerCase()) {
      case 'circle': return new Circle(dims[0]);
      case 'rectangle': return new Rectangle(dims[0], dims[1]);
      case 'triangle': return new Triangle(dims[0], dims[1], dims[2]);
      default: throw new Error('Unknown: ' + type);
    }
  }
}`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Circle area is π×r²",
        input: "new Circle(5).area()",
        expectedOutput: "78.54 (approx)",
        isHidden: false,
      },
      {
        id: "tc2",
        description: "Rectangle perimeter",
        input: "new Rectangle(4, 6).perimeter()",
        expectedOutput: "20",
        isHidden: false,
      },
      {
        id: "tc3",
        description: "ShapeFactory creates correct type",
        input: "ShapeFactory.create('circle', 3) instanceof Circle",
        expectedOutput: "true",
        isHidden: false,
      },
    ],
  },
  {
    id: "13",
    slug: "what-is-ood-interview",
    title: "What is an OOD Interview?",
    difficulty: "Easy",
    category: "Fundamentals",
    tags: ["Interview Prep"],
    order: -1,
    description: `## What is a Low Level Design / OOD Interview?

A **Low Level Design (LLD)** interview, also called a **Machine Coding** or **Object-Oriented Design (OOD)** interview, tests your ability to translate real-world systems into clean, extensible code.

### What the interviewer is looking for

1. **Requirements clarification** — Do you ask the right questions before diving into code?
2. **Entity identification** — Can you identify the key objects/classes in a system?
3. **Class design** — Are your classes cohesive? Single responsibility?
4. **Relationships** — Do you correctly model inheritance, composition, associations?
5. **Design patterns** — Do you recognize and apply appropriate patterns?
6. **Code quality** — Is your code readable, extensible, and correct?
7. **Edge cases** — Do you handle null cases, concurrent access, invalid inputs?

### The 45-minute framework

| Time | Activity |
|------|----------|
| 0–5 min | Clarify requirements, define scope |
| 5–10 min | Identify entities and relationships |
| 10–15 min | Define class interfaces and relationships (class diagram) |
| 15–40 min | Implement core classes and behaviors |
| 40–45 min | Test cases, walk through scenarios |

### What NOT to do

- Don't start coding immediately — clarify requirements first
- Don't design for every possible future requirement
- Don't over-engineer — a working solution beats a perfect design
- Don't forget to mention design patterns you're using and why

### Practice on this platform

Each problem here follows the real interview structure:
1. **Problem statement** — What the system needs to do
2. **Constraints** — Boundaries and rules
3. **Design hints** — Progressive hints using the guided approach
4. **Code editor** — Write your solution
5. **Test cases** — Validate core behaviors
6. **Reference solution** — See the ideal approach with explanations`,
    constraints: `This is a conceptual problem — no coding required.
Read the framework above and use it for every problem on this platform.`,
    hints: [
      "In an interview, spend the first 5 minutes ONLY asking questions — don't write any code",
      "Draw a simple class diagram on paper/whiteboard before coding — even a rough sketch helps",
      "Name your patterns: 'I'm using the Strategy pattern here because...' shows design maturity",
    ],
    starterCode: {
      java: `// No coding required for this conceptual problem
// Read the theory above, then move to Problem 2: OOP Fundamentals

public class Main {
    public static void main(String[] args) {
        System.out.println("Ready to design!");
    }
}`,
      cpp: `// No coding required for this conceptual problem
#include <iostream>
int main() {
    std::cout << "Ready to design!" << std::endl;
    return 0;
}`,
      javascript: `// No coding required for this conceptual problem
console.log("Ready to design!");`,
    },
    solution: {
      java: `// This is a conceptual problem — see the theory above`,
      cpp: `// This is a conceptual problem — see the theory above`,
      javascript: `// This is a conceptual problem — see the theory above`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Hello world — confirm setup works",
        input: 'print "Ready to design!"',
        expectedOutput: "Ready to design!",
        isHidden: false,
      },
    ],
  },
  {
    id: "14",
    slug: "ood-interview-framework",
    title: "A Framework for the OOD Interview",
    difficulty: "Easy",
    category: "Fundamentals",
    tags: ["Interview Prep"],
    order: -2,
    description: `## The LLDCode Interview Framework

Use this systematic approach for every LLD/machine coding interview.

### Step 1 — Requirements Clarification (5 min)

Ask these questions for any system:
- Who are the users/actors?
- What are the core use cases (not edge cases)?
- What scale/constraints should I assume?
- What should I explicitly NOT design? (define scope)

**Example for Parking Lot:**
- "How many floors/spots?" → "Assume 3 floors, 30 spots each"
- "What vehicle types?" → "Cars, motorcycles, trucks"
- "Do I need payment processing?" → "No, just fee calculation"

### Step 2 — Identify Core Entities (5 min)

Look for nouns in the requirements → these become classes.

> "A **parking lot** has multiple **levels**. Each level has **spots** of different sizes. **Vehicles** enter and receive **tickets**."

Entities: ParkingLot, Level, ParkingSpot, Vehicle, Ticket

### Step 3 — Define Relationships (5 min)

- **Inheritance (IS-A)**: Car IS-A Vehicle
- **Composition (HAS-A, strong)**: ParkingLot HAS Levels (levels can't exist without lot)
- **Association (HAS-A, weak)**: Ticket HAS Vehicle reference
- **Dependency (USES)**: ParkingLot USES FeeCalculator

### Step 4 — Identify Design Patterns (2 min)

| Clue in Requirements | Likely Pattern |
|---------------------|----------------|
| "Only one instance" | Singleton |
| "Different algorithms" | Strategy |
| "State-dependent behavior" | State |
| "Notify multiple objects" | Observer |
| "Create objects by type" | Factory |
| "Tree structure" | Composite |

### Step 5 — Define Public API (3 min)

Before writing implementation, write the method signatures:
\`\`\`java
class ParkingLot {
    ParkingTicket parkVehicle(Vehicle v);    // returns null if full
    double unparkVehicle(ParkingTicket t);   // returns fee
    int getAvailableSpots();
}
\`\`\`

### Step 6 — Implement Core Classes (25 min)

Priority: core logic first, edge cases after.

### Step 7 — Test & Walk Through (5 min)

Walk through a key scenario verbally with test data.`,
    constraints: `No coding required — internalize this framework.
Apply it to every subsequent problem on this platform.`,
    hints: [
      "Print this framework and keep it visible while solving problems",
      "The most common mistake: jumping to code at Step 1. Always clarify first.",
    ],
    starterCode: {
      java: `// Apply this framework to design problems
// Try it on: Design a Library Management System (bonus problem)

public class Main {
    public static void main(String[] args) {
        System.out.println("Framework loaded. Start designing!");
    }
}`,
      cpp: `#include <iostream>
int main() {
    std::cout << "Framework loaded!" << std::endl;
    return 0;
}`,
      javascript: `console.log("Framework loaded. Start designing!");`,
    },
    solution: {
      java: `// Conceptual problem — see framework above`,
      cpp: `// Conceptual problem — see framework above`,
      javascript: `// Conceptual problem — see framework above`,
    },
    testCases: [
      {
        id: "tc1",
        description: "Confirm environment works",
        input: 'print "Framework loaded"',
        expectedOutput: "Framework loaded. Start designing!",
        isHidden: false,
      },
    ],
  },
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return PROBLEMS.find((p) => p.slug === slug);
}

export function getProblemsOrdered(): Problem[] {
  return [...PROBLEMS].sort((a, b) => a.order - b.order);
}
