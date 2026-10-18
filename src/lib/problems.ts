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
  {
    id: "15",
    slug: "design-hospital-appointment-booking",
    title: "Design a Hospital Appointment Booking System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Scheduling", "Doctor Availability", "Slot Management", "Concurrency", "Notifications"],
    order: 15,
    description: `## Problem Statement

Design a hospital appointment booking system where patients can search for doctors by specialization, view available slots, book appointments, and receive confirmations — while doctors manage their own availability independently.

## Requirements

### Functional Requirements
- Doctor profiles: name, specialization, experience, rating, consultation fee
- Doctors create their own availability slots (date, start time, end time, slot duration)
- Patients search doctors by specialization, location, availability date
- Book an available slot — concurrent booking prevention
- Appointment lifecycle: SCHEDULED → CONFIRMED → COMPLETED / CANCELLED / NO_SHOW
- Doctors can cancel or reschedule appointments
- Patients receive confirmation notifications
- Medical records per patient (view history of appointments)
- Reminders: automated notifications 24h and 1h before appointment

### Non-Functional Requirements
- Thread-safe slot booking
- Singleton HospitalSystem

## Key Entities
- **Doctor**: id, name, specialization, experience, rating, slots
- **Patient**: id, name, email, phone, medicalHistory
- **Slot**: id, doctor, date, startTime, endTime, available
- **Appointment**: id, patient, doctor, slot, status, notes, fee
- **HospitalSystem**: Singleton; manages doctors, patients, slots, appointments

## Constraints
- A slot can be booked by exactly one patient
- Doctors cannot create overlapping slots
- Cancellation allowed up to 2 hours before appointment
- Maximum 20 appointments per doctor per day`,
    constraints: `- One patient per slot — concurrent booking synchronized
- Doctors cannot have overlapping slot definitions
- Cancellation allowed up to 2 hours before appointment time
- Max 20 appointments per doctor per day
- No-show after 15 minutes changes status to NO_SHOW automatically`,
    hints: [
      "Synchronize on the Slot object when booking \u2014 check `available` flag and set it atomically.",
    "Store slots as a sorted list per doctor \u2014 check for overlaps using interval intersection when doctor adds new slot.",
    "Use ScheduledExecutorService to trigger reminder notifications and auto-mark NO_SHOW.",
    "MedicalHistory is a List<Appointment> per patient \u2014 ordered by appointment date.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Hospital Appointment Booking System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAHospitalAppoiSystem system = new DesignAHospitalAppoiSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAHospitalAppoiSystem {
    public DesignAHospitalAppoiSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Hospital Appointment Booking System

class DesignAHospitalAppoiSystem {
public:
    DesignAHospitalAppoiSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAHospitalAppoiSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Hospital Appointment Booking System

class DesignAHospitalAppoiSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAHospitalAppoiSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-hospital-appointment-booking-tc1",
        description: "Test case 1",
        input: "Patient P1 searches for Cardiologist available on 2024-01-20. Dr. Sharma has slots at 10:00 and 11:00.",
        expectedOutput: "Returns: [{Dr. Sharma, Cardiology, 10:00, \u20b9800}, {Dr. Sharma, Cardiology, 11:00, \u20b9800}]",
        isHidden: false,
      },
      {
        id: "design-hospital-appointment-booking-tc2",
        description: "Test case 2",
        input: "P1 and P2 simultaneously attempt to book Dr. Sharma's 10:00 slot.",
        expectedOutput: "P1 succeeds. P2 receives: 'Slot no longer available. Please choose another time.'",
        isHidden: true,
      },
    ],
  },
  {
    id: "16",
    slug: "design-issue-tracker",
    title: "Design a Jira-like Issue Tracker",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Workflow Management", "Sprint", "Reporting", "Observer Pattern", "CRUD"],
    order: 16,
    description: `## Problem Statement

Design a project issue tracking system like Jira where teams manage bugs, features, and user stories across sprints with full reporting capabilities.

## Requirements

### Functional Requirements
- Issue types: BUG, FEATURE, STORY, SUBTASK — each with title, description, priority, assignee, reporter, labels
- Issue workflow: OPEN → IN_PROGRESS → IN_REVIEW → RESOLVED → CLOSED (custom transitions allowed)
- Epic management: group related stories and features
- Sprint planning: create sprints, move issues to sprint backlog
- Sprint reports: completed issues, delayed issues, velocity (story points)
- Assignments: assign/reassign issues to team members
- Comments and activity log on each issue
- Filtering: by type, priority, assignee, label, sprint, date range
- Notifications on assignment, status change, comment
- Time tracking: log work hours against an issue

### Non-Functional Requirements
- Thread-safe concurrent issue updates
- Singleton IssueTrackerService

## Key Entities
- **Issue**: id, type, title, priority, status, assignee, reporter, sprint, epic, storyPoints, comments, workLog, labels
- **Sprint**: id, name, startDate, endDate, status, issues
- **Epic**: id, name, description, issues
- **Comment**: author, content, timestamp
- **WorkLog**: author, hoursLogged, description, date
- **IssueTrackerService**: Singleton

## Constraints
- Subtasks cannot have their own subtasks
- Closing a sprint moves all non-RESOLVED issues back to backlog
- Story points can only be set on STORYs and FEATUREs
- Only OPEN/IN_PROGRESS issues can be added to an active sprint`,
    constraints: `- Subtasks are single-level only
- Sprint close moves unresolved issues to project backlog
- Only STORY and FEATURE issue types carry story points
- Active sprint only accepts OPEN or IN_PROGRESS issues
- Thread-safe status transitions`,
    hints: [
      "Use a transition matrix (Map<Status, Set<Status>>) to define and enforce valid workflow transitions per issue type.",
    "Sprint velocity = sum of story points of all RESOLVED/CLOSED issues in the sprint.",
    "Epic is essentially a label grouping \u2014 maintain a Set<IssueId> in Epic; issues reference their epicId.",
    "Activity log = append-only list of ActivityEntry(type, actor, oldValue, newValue, timestamp) per issue.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Jira-like Issue Tracker
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAJiralikeIssueSystem system = new DesignAJiralikeIssueSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAJiralikeIssueSystem {
    public DesignAJiralikeIssueSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Jira-like Issue Tracker

class DesignAJiralikeIssueSystem {
public:
    DesignAJiralikeIssueSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAJiralikeIssueSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Jira-like Issue Tracker

class DesignAJiralikeIssueSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAJiralikeIssueSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-issue-tracker-tc1",
        description: "Test case 1",
        input: "Sprint S2 is closed. Issues: T1=RESOLVED, T2=IN_PROGRESS, T3=OPEN. Sprint report requested.",
        expectedOutput: "Sprint closed. T1 counted as completed. T2 and T3 moved to backlog. Velocity = T1's story points.",
        isHidden: false,
      },
      {
        id: "design-issue-tracker-tc2",
        description: "Test case 2",
        input: "Developer attempts to transition BUG from OPEN directly to CLOSED.",
        expectedOutput: "Invalid transition: OPEN \u2192 CLOSED not permitted. Must go through IN_PROGRESS \u2192 RESOLVED first.",
        isHidden: true,
      },
    ],
  },
  {
    id: "17",
    slug: "design-chat-application",
    title: "Design a WhatsApp-like Chat Application",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Messaging", "Group Chat", "Online Status", "Delivery Receipts", "Concurrency"],
    order: 17,
    description: `## Problem Statement

Design a messaging application like WhatsApp supporting one-on-one and group chats, message delivery receipts, online/last-seen status, and media sharing.

## Requirements

### Functional Requirements
- User registration with phone number and display name
- One-on-one conversations: send/receive text messages
- Group chats: create groups, add/remove members, group messages
- Message delivery status: SENT → DELIVERED → READ (single tick, double tick, blue tick)
- Online/offline status and last-seen timestamp
- Message types: TEXT, IMAGE, VIDEO, DOCUMENT, VOICE_NOTE
- Message history: retrieve last N messages in a conversation
- Reply to specific messages (quoted replies)
- Delete messages: for me / for everyone (within 1 hour)
- Offline message delivery: messages queued and delivered when user comes online

### Non-Functional Requirements
- Thread-safe concurrent messaging
- Async message delivery
- Singleton ChatService

## Key Entities
- **User**: id, phone, displayName, status (ONLINE/OFFLINE/BUSY), lastSeen
- **Message**: id, sender, conversation, type, content, timestamp, status, replyTo
- **Conversation**: id, type (ONE_ON_ONE / GROUP), participants, messages
- **Group**: id, name, admin, members, groupIcon
- **MessageStatus**: SENT, DELIVERED, READ
- **ChatService**: Singleton; manages users, conversations, message routing

## Constraints
- Group max size: 256 members
- Delete for everyone: within 60 minutes of send
- Offline users: messages queued in server inbox, delivered on reconnect
- Group message delivery status = DELIVERED only when all members have received it`,
    constraints: `- Max group size: 256 members
- Delete for everyone allowed only within 60 minutes of message send time
- Message queued server-side for offline recipients
- Group delivery = DELIVERED when all recipients receive; READ when all have read
- Thread-safe message delivery and status updates`,
    hints: [
      "Model Conversation as a generic container \u2014 it holds participants and messages; Group is a special Conversation subtype.",
    "Delivery status is per-recipient for group messages \u2014 store a Map<UserId, MessageStatus> per message.",
    "Offline queue: maintain an inbox queue per user; flush on user coming online.",
    "Use Observer pattern for real-time delivery \u2014 each active user session subscribes to their conversation events.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a WhatsApp-like Chat Application
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAWhatsapplikeCSystem system = new DesignAWhatsapplikeCSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAWhatsapplikeCSystem {
    public DesignAWhatsapplikeCSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a WhatsApp-like Chat Application

class DesignAWhatsapplikeCSystem {
public:
    DesignAWhatsapplikeCSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAWhatsapplikeCSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a WhatsApp-like Chat Application

class DesignAWhatsapplikeCSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAWhatsapplikeCSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-chat-application-tc1",
        description: "Test case 1",
        input: "User A sends message to offline User B. B comes online 5 minutes later.",
        expectedOutput: "Message queued on server. On B's reconnect, message delivered. Status updates to DELIVERED for A.",
        isHidden: false,
      },
      {
        id: "design-chat-application-tc2",
        description: "Test case 2",
        input: "A sends message to group G (3 members: A, B, C). B reads it; C has not.",
        expectedOutput: "Message status = DELIVERED (all received). Not READ yet (C hasn't read). Blue tick shows after C reads.",
        isHidden: true,
      },
    ],
  },
  {
    id: "18",
    slug: "design-dating-app-matching",
    title: "Design a Tinder-like Dating App Matching System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Matching Algorithm", "Geolocation", "Swipe Mechanics", "Profile Management", "Recommendation"],
    order: 18,
    description: `## Problem Statement

Design the core backend of a dating/social matching application like Tinder — handling user profiles, preference-based discovery, swipe mechanics, mutual match detection, and match conversations.

## Requirements

### Functional Requirements
- User profiles: photos, bio, age, gender, location, interests
- Preference settings: age range, distance radius, preferred gender(s)
- Discovery feed: show potential matches based on preferences and proximity
- Swipe RIGHT (like) or LEFT (pass) on profiles
- Mutual match: if both users swipe right on each other, create a Match
- Match notification: both users notified on mutual match
- Conversation unlocked only after a match
- Super like (limited per day): shows user prominently to the liked person
- Undo last swipe (premium feature)
- Block/report users

### Non-Functional Requirements
- Thread-safe match detection (concurrent swipes)
- Location-based profile ranking
- Singleton MatchingService

## Key Entities
- **UserProfile**: id, name, age, gender, bio, photos, location, preferences, interests
- **Swipe**: swiperId, targetId, type (LIKE/PASS/SUPER_LIKE), timestamp
- **Match**: id, user1, user2, matchedAt, conversation
- **Conversation**: matchId, messages
- **DiscoveryService**: filters and ranks potential matches
- **MatchingService**: Singleton; manages swipes, match detection, conversations

## Constraints
- Super like limited to 1 per day (free) or 5 per day (premium)
- Discovery feed excludes: already swiped, blocked, and users outside preferences
- Distance calculated using Haversine formula (simplified: Euclidean OK for interviews)
- Conversation only available after mutual match
- Undo limited to last 1 swipe (premium only)`,
    constraints: `- Super likes: 1/day free tier, 5/day premium
- Discovery excludes already-swiped and blocked profiles
- Mutual match detection must be thread-safe (concurrent right swipes)
- Messaging only available between matched users
- Undo only available to premium users, for last swipe only`,
    hints: [
      "Store swipes in a Set<UserId> per user for O(1) check: 'has user A liked user B?'.",
    "Match detection: when user A swipes right on B, check if B has already swiped right on A \u2014 if yes, create Match.",
    "Synchronize match creation to handle simultaneous mutual swipes: A swipes B and B swipes A at the exact same millisecond.",
    "Discovery feed: filter by preferences \u2192 sort by distance \u2192 exclude seen profiles \u2192 return top N.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Tinder-like Dating App Matching System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignATinderlikeDatSystem system = new DesignATinderlikeDatSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignATinderlikeDatSystem {
    public DesignATinderlikeDatSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Tinder-like Dating App Matching System

class DesignATinderlikeDatSystem {
public:
    DesignATinderlikeDatSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignATinderlikeDatSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Tinder-like Dating App Matching System

class DesignATinderlikeDatSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignATinderlikeDatSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-dating-app-matching-tc1",
        description: "Test case 1",
        input: "User A swipes RIGHT on User B. User B had previously swiped RIGHT on User A.",
        expectedOutput: "Match created! Both A and B notified: 'You matched with [name]!' Conversation thread opened.",
        isHidden: false,
      },
      {
        id: "design-dating-app-matching-tc2",
        description: "Test case 2",
        input: "User A's discovery feed request. A is female, 25, prefers males aged 24\u201330 within 25km. 3 matching profiles found.",
        expectedOutput: "Returns 3 profiles sorted by distance (nearest first), excluding anyone A has already swiped on.",
        isHidden: true,
      },
    ],
  },
  {
    id: "19",
    slug: "design-url-shortener",
    title: "Design a URL Shortener",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Hashing", "Redirection", "Analytics", "Cache", "Collision Handling"],
    order: 19,
    description: `## Problem Statement

Design a URL shortening service like bit.ly or TinyURL that generates short aliases for long URLs, handles redirection, supports custom slugs, tracks analytics, and handles high concurrency.

## Requirements

### Functional Requirements
- \`shorten(longUrl)\` → generate a unique short code (6–8 chars, alphanumeric)
- \`shorten(longUrl, customSlug)\` → use provided custom slug if available
- \`resolve(shortCode)\` → redirect to original long URL
- Expiry: optional TTL on shortened URLs
- Analytics per short URL: click count, referrer, geographic distribution, time of access
- User accounts: users own their shortened URLs, can manage them
- Rate limiting: prevent abuse (max 100 shortens/day per user)
- Delete/deactivate a short URL

### Non-Functional Requirements
- O(1) URL resolution (cache-backed)
- Thread-safe short code generation
- Collision-free code generation
- Singleton URLShortenerService

## Key Entities
- **URLMapping**: shortCode, longUrl, userId, createdAt, expiresAt, clickCount
- **ClickEvent**: shortCode, timestamp, referrer, ipAddress, country
- **User**: id, email, urlMappings
- **CodeGenerator**: generates unique 6-char base62 codes (a-z, A-Z, 0-9)
- **URLShortenerService**: Singleton; manages mappings, resolution, analytics

## Constraints
- Short codes: 6 characters, base62 = 62^6 ≈ 56 billion unique codes
- Custom slugs: 3–20 chars, alphanumeric + hyphens only
- Expired URLs return 410 Gone status
- Resolution must use cache (LRU) for hot URLs`,
    constraints: `- Short code: 6-character base62 (a-z, A-Z, 0-9)
- Custom slugs: 3–20 characters, alphanumeric and hyphens only
- Collision on code generation must be handled with retry
- Expired URLs return appropriate error (410 Gone)
- Resolution path is O(1) via cache layer`,
    hints: [
      "Code generation: use MD5/SHA256 of (longUrl + timestamp), take first 6 chars in base62; on collision, retry with different seed.",
    "Alternatively, use a counter-based approach: increment a global counter, encode in base62 \u2014 guarantees uniqueness.",
    "Cache resolution: LRU cache with (shortCode \u2192 longUrl); cache misses fall through to storage.",
    "Analytics: write click events asynchronously to avoid slowing down redirection (fire-and-forget to a queue).",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a URL Shortener
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAUrlShortenerSystem system = new DesignAUrlShortenerSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAUrlShortenerSystem {
    public DesignAUrlShortenerSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a URL Shortener

class DesignAUrlShortenerSystem {
public:
    DesignAUrlShortenerSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAUrlShortenerSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a URL Shortener

class DesignAUrlShortenerSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAUrlShortenerSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-url-shortener-tc1",
        description: "Test case 1",
        input: "shorten('https://www.example.com/very/long/url/with/parameters?key=value')",
        expectedOutput: "Returns short URL: 'https://short.ly/aB3xYz'. Mapping stored in service.",
        isHidden: false,
      },
      {
        id: "design-url-shortener-tc2",
        description: "Test case 2",
        input: "resolve('aB3xYz'). URL was created with TTL=30 days, now 31 days old.",
        expectedOutput: "Returns error: URL expired (410 Gone). Mapping marked as inactive.",
        isHidden: true,
      },
    ],
  },
  {
    id: "20",
    slug: "design-leaderboard-system",
    title: "Design a Leaderboard System",
    difficulty: "Medium",
    category: "Data Structures",
    tags: ["Sorted Data Structures", "Ranking", "Real-Time Updates", "Concurrency", "Pagination"],
    order: 20,
    description: `## Problem Statement

Design a real-time leaderboard system for contests, games, or referral programs — supporting score updates, rank queries, top-N retrieval, and concurrent update handling with consistent rankings.

## Requirements

### Functional Requirements
- \`addScore(userId, score)\` — set or update a user's score
- \`incrementScore(userId, delta)\` — add delta to current score
- \`getRank(userId)\` — return the user's current rank (1-indexed, 1 = highest score)
- \`getTopN(n)\` — return top N users sorted by score descending
- \`getLeaderboard(offset, limit)\` — paginated leaderboard view
- \`getUsersAroundRank(userId, window)\` — return users within ±window positions of given user
- Support multiple leaderboards (e.g., daily, weekly, all-time) simultaneously
- Reset a leaderboard (e.g., daily reset at midnight)
- Tie-breaking: users with equal scores ranked by insertion order (earlier = higher rank)

### Non-Functional Requirements
- Thread-safe score updates
- getRank O(log n), getTopN O(k log n)
- Configurable maximum leaderboard size

## Key Entities
- **LeaderboardEntry**: userId, score, lastUpdated
- **Leaderboard**: id, name, entries sorted by (score DESC, insertionTime ASC)
- **LeaderboardService**: manages multiple named leaderboards

## Constraints
- Scores are non-negative integers
- getRank must reflect latest scores — no caching stale ranks
- Thread-safe: concurrent score updates must not corrupt rankings
- Leaderboard size cap: configurable (default 10,000 entries)`,
    constraints: `- Scores are non-negative integers
- Tie-breaking by insertion/first-score time (earlier = better rank)
- Thread-safe concurrent score updates
- getRank reflects latest data (no stale cache)
- Leaderboard max size configurable, default 10,000`,
    hints: [
      "Use a TreeMap<ScoreKey, UserId> sorted by (score DESC, timestamp ASC) for O(log n) rank queries \u2014 position in tree = rank.",
    "Maintain a parallel HashMap<UserId, ScoreKey> for O(1) user-to-score lookup; on update, remove old entry from TreeMap and insert new.",
    "For getRank, use TreeMap.headMap(entry).size() + 1.",
    "For getUsersAroundRank, get the user's position, then use tree navigation to collect \u00b1window neighbors.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Leaderboard System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignALeaderboardSySystem system = new DesignALeaderboardSySystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignALeaderboardSySystem {
    public DesignALeaderboardSySystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Leaderboard System

class DesignALeaderboardSySystem {
public:
    DesignALeaderboardSySystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignALeaderboardSySystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Leaderboard System

class DesignALeaderboardSySystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignALeaderboardSySystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-leaderboard-system-tc1",
        description: "Test case 1",
        input: "Leaderboard has: Alice=500, Bob=300, Carol=500 (Carol added after Alice). getRank('Alice'), getRank('Carol').",
        expectedOutput: "Alice rank = 1 (tie-break: earlier). Carol rank = 2. Bob rank = 3.",
        isHidden: false,
      },
      {
        id: "design-leaderboard-system-tc2",
        description: "Test case 2",
        input: "getTopN(3) from leaderboard with 10 entries: top scores are [1000, 850, 700, ...].",
        expectedOutput: "Returns [{userId_X, 1000}, {userId_Y, 850}, {userId_Z, 700}] in that order.",
        isHidden: true,
      },
    ],
  },
  {
    id: "21",
    slug: "design-coupon-promo-system",
    title: "Design a Coupon / Promo Code System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Business Rules", "Strategy Pattern", "Validation", "Concurrency", "Usage Limits"],
    order: 21,
    description: `## Problem Statement

Design a flexible coupon and promotional code system that supports multiple discount types, usage limits, user-specific coupons, and time-bound validity — used in e-commerce or food delivery platforms.

## Requirements

### Functional Requirements
- Create coupon codes with: type, value, min order amount, max discount cap, expiry date, usage limit
- Coupon types: PERCENTAGE_OFF (e.g., 20%), FLAT_OFF (e.g., ₹100 off), FREE_SHIPPING, BUY_X_GET_Y
- Usage limits: total uses cap (e.g., first 1000 users), per-user limit (e.g., once per user)
- Scope: applicable to all orders, specific categories, or specific products
- \`applyCoupon(couponCode, order)\` → returns discount amount and updated order
- Validate: active, not expired, user eligibility, minimum order value, usage count
- Admin: create, deactivate, view usage stats per coupon
- Stacking: configurable whether multiple coupons can be applied to one order

### Non-Functional Requirements
- Thread-safe usage count increment
- Singleton CouponService

## Key Entities
- **Coupon**: code, type, value, minOrderValue, maxDiscount, expiryDate, totalUsageLimit, perUserLimit, usageCount, scope, active
- **CouponUsage**: couponCode, userId, orderId, usedAt, discountApplied
- **DiscountStrategy** (interface): \`calculateDiscount(Order, Coupon)\` — PercentageStrategy, FlatStrategy, etc.
- **CouponService**: Singleton; manages coupons and validations

## Constraints
- Usage limit enforced atomically (no overshooting)
- Coupon application is atomic: validate → reserve → apply (or rollback)
- Expired coupons cannot be reactivated
- Percentage discount capped at \`maxDiscount\` value`,
    constraints: `- Usage count increment is atomic — prevents exceeding totalUsageLimit
- Percentage discount capped at maxDiscount amount
- Per-user limit tracked in CouponUsage table
- Expired or inactive coupons always rejected
- Minimum order value validated before discount applied`,
    hints: [
      "Use Strategy Pattern for discount calculation \u2014 each coupon type has its own `calculateDiscount` implementation.",
    "Atomic usage increment: use AtomicInteger for usageCount; compare-and-set to ensure limit is never exceeded.",
    "Validate in order: active? \u2192 not expired? \u2192 min order met? \u2192 user limit met? \u2192 total limit met? \u2192 apply.",
    "Scope filtering: if coupon is category-scoped, only apply discount to items in that category, not the full order total.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Coupon / Promo Code System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignACouponPromoCoSystem system = new DesignACouponPromoCoSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignACouponPromoCoSystem {
    public DesignACouponPromoCoSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Coupon / Promo Code System

class DesignACouponPromoCoSystem {
public:
    DesignACouponPromoCoSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignACouponPromoCoSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Coupon / Promo Code System

class DesignACouponPromoCoSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignACouponPromoCoSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-coupon-promo-system-tc1",
        description: "Test case 1",
        input: "Coupon 'SAVE20': 20% off, min order \u20b9500, max discount \u20b9300. Order total = \u20b92000.",
        expectedOutput: "Calculated discount = 20% of \u20b92000 = \u20b9400 \u2192 capped at \u20b9300. Final order = \u20b91700.",
        isHidden: false,
      },
      {
        id: "design-coupon-promo-system-tc2",
        description: "Test case 2",
        input: "Coupon 'FIRST100' has usage limit = 1000, currently at 1000. User applies it.",
        expectedOutput: "Coupon rejected: usage limit exhausted. Order total unchanged.",
        isHidden: true,
      },
    ],
  },
  {
    id: "22",
    slug: "design-expense-sharing",
    title: "Design a Splitwise-style Expense Sharing for Groups (Simplified)",
    difficulty: "Easy",
    category: "Real World Systems",
    tags: ["Balance Tracking", "Equal Split", "Debt Simplification", "Graph"],
    order: 22,
    description: `## Problem Statement

Design a simplified expense sharing tool for a group of friends. Users add expenses, view who owes whom, and settle debts. Focus on correct balance computation with equal splits only.

## Requirements

### Functional Requirements
- Add a user to the system
- Add an expense: who paid, how much, which users share it equally
- \`getBalance(userId)\` → net balance (positive = owed money, negative = owes money)
- \`getOwes(userA, userB)\` → how much A owes B (or B owes A)
- \`settle(userA, userB)\` → record that A paid back B in full
- List all outstanding debts in the group
- Simplify debts: minimize number of transactions to settle all balances

### Non-Functional Requirements
- Simple in-memory storage
- No concurrency required for this simplified version

## Key Entities
- **User**: id, name
- **Expense**: id, payer, participants, amount, description, timestamp
- **BalanceSheet**: Map<UserId, Map<UserId, Double>> — net amounts between each pair
- **ExpenseService**: manages users, expenses, and balance computations

## Constraints
- Equal split only (amount / number of participants)
- Settle clears balance between two users to zero
- Self-paying expenses (only 1 participant) are ignored
- Balances stored as net amounts per user pair`,
    constraints: `- Equal split only
- Self-expenses (payer is sole participant) are not tracked
- Settle operation zeros out the balance between two users
- Balances are always stored as net (no duplicate entries for A↔B and B↔A)
- Debt simplification is optional bonus`,
    hints: [
      "Store balances[A][B] = X means A owes B exactly X. Always use the canonical key: store as smaller_id \u2192 larger_id.",
    "When adding expense: for each non-payer participant, add (amount/n) to their debt to the payer.",
    "getBalance(user): sum all entries where user owes others (negative) and is owed by others (positive).",
    "Debt simplification: compute net balance per person as a single number; match creditors with debtors greedily.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Splitwise-style Expense Sharing for Groups (Simplified)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignASplitwisestylSystem system = new DesignASplitwisestylSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignASplitwisestylSystem {
    public DesignASplitwisestylSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Splitwise-style Expense Sharing for Groups (Simplified)

class DesignASplitwisestylSystem {
public:
    DesignASplitwisestylSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignASplitwisestylSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Splitwise-style Expense Sharing for Groups (Simplified)

class DesignASplitwisestylSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignASplitwisestylSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-expense-sharing-tc1",
        description: "Test case 1",
        input: "A, B, C split a \u20b9300 dinner \u2014 A paid. getOwes(B, A), getOwes(C, A).",
        expectedOutput: "B owes A \u20b9100. C owes A \u20b9100.",
        isHidden: false,
      },
      {
        id: "design-expense-sharing-tc2",
        description: "Test case 2",
        input: "A owes B \u20b9200. B owes C \u20b9300. C owes A \u20b9100. Run simplify.",
        expectedOutput: "Simplified: A pays C \u20b9100, A pays B \u20b9100, B pays C \u20b9200. (3 transactions, net balances preserved)",
        isHidden: true,
      },
    ],
  },
  {
    id: "23",
    slug: "design-ride-sharing-matching",
    title: "Design a Ride-Sharing Matching Engine",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Geolocation", "Matching Algorithm", "Route Overlap", "Priority Queue", "Concurrency"],
    order: 23,
    description: `## Problem Statement

Design the core matching engine for a ride-sharing platform like BlaBlaCar or Uber Pool — where drivers offering rides along a route are matched to riders whose pickup/drop-off points fall within the route.

## Requirements

### Functional Requirements
- Driver offers a ride: source, destination, departure time, available seats, vehicle type, price per km
- Rider requests a ride: pickup location, drop location, desired departure window
- Matching algorithm: find drivers whose route covers the rider's pickup and drop-off
- Rank matches: by price, ETA, or rating
- Rider books one of the matched rides (seat deducted)
- Driver sees all booked riders for their trip
- Trip completion and rating (both sides)
- Cancel ride: driver cancels (all riders notified), or rider cancels (seat freed)

### Non-Functional Requirements
- Thread-safe seat booking
- Efficient route matching (proximity checks)

## Key Entities
- **Ride**: id, driver, source, destination, departureTime, totalSeats, availableSeats, price, waypoints
- **RideRequest**: id, rider, pickupLocation, dropLocation, desiredTime
- **Booking**: rideId, riderId, pickupStop, dropStop, fare
- **MatchingService**: \`findMatches(RideRequest)\` → List<Ride>
- **Driver/Rider**: profile entities

## Constraints
- Route overlap check: rider's pickup and drop must fall within driver's origin-destination corridor (configurable radius)
- Available seats must be > 0 for matching
- Departure time window: rider's desired time within ±1 hour of driver's departure
- Thread-safe seat decrement`,
    constraints: `- Rider pickup and drop must fall within driver route corridor (±5 km radius from route)
- Departure time match within ±1 hour window
- Seat booking is atomic — concurrent bookings cannot oversell
- Driver minimum 1 available seat required to appear in matches
- Cancellation penalty applies within 1 hour of departure`,
    hints: [
      "Route overlap: project rider's pickup/drop onto the driver's route line and check that both fall within the route bounds.",
    "Use a simple bounding box check first (O(1)) then precise distance check only for candidates that pass the bounding box.",
    "Available seat decrement: synchronized on the Ride object.",
    "Rank matches: create a scored list using composite score (price \u00d7 weight + distance \u00d7 weight + rating \u00d7 weight) and sort.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Ride-Sharing Matching Engine
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignARidesharingMaSystem system = new DesignARidesharingMaSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignARidesharingMaSystem {
    public DesignARidesharingMaSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Ride-Sharing Matching Engine

class DesignARidesharingMaSystem {
public:
    DesignARidesharingMaSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignARidesharingMaSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Ride-Sharing Matching Engine

class DesignARidesharingMaSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignARidesharingMaSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-ride-sharing-matching-tc1",
        description: "Test case 1",
        input: "Driver offers ride Delhi\u2192Agra at 8:00 AM, 3 seats. Rider requests pickup near Faridabad (on Delhi-Agra highway) at 8:30 AM.",
        expectedOutput: "Ride returned as a match. Fare calculated for Faridabad\u2192Agra segment. Rider books \u2014 seats: 3\u21922.",
        isHidden: false,
      },
      {
        id: "design-ride-sharing-matching-tc2",
        description: "Test case 2",
        input: "Same ride above, 2 riders book simultaneously for the last seat.",
        expectedOutput: "First booking succeeds. Second gets: 'No seats available for this ride.' Available seats = 0.",
        isHidden: true,
      },
    ],
  },
  {
    id: "24",
    slug: "design-job-scheduler",
    title: "Design a Job Scheduling System",
    difficulty: "Hard",
    category: "Concurrency",
    tags: ["Scheduling", "Thread Pool", "Cron", "Priority Queue", "Concurrency"],
    order: 24,
    description: `## Problem Statement

Design a job scheduling system that executes tasks at specific times or recurring intervals, supports priorities, handles failures with retry, and manages a configurable worker thread pool — similar to Quartz Scheduler or cron.

## Requirements

### Functional Requirements
- Schedule a job: one-time at a specific timestamp or recurring (cron expression / interval)
- Job types: one-time, fixed-delay, fixed-rate, cron-based
- Priority: HIGH, MEDIUM, LOW — higher priority jobs execute first when multiple are ready
- Concurrency control: max N jobs running simultaneously (thread pool)
- On failure: retry up to K times with configurable backoff
- Cancel a scheduled job
- Job status: PENDING, RUNNING, COMPLETED, FAILED, CANCELLED
- View next execution time for recurring jobs
- Job history with execution times and results

### Non-Functional Requirements
- Thread pool for concurrent job execution
- Priority queue for scheduling decisions
- Thread-safe job state management

## Key Entities
- **Job**: id, name, task (Callable/Runnable), schedule, priority, retryConfig, status
- **Schedule**: type (ONE_TIME/FIXED_RATE/FIXED_DELAY/CRON), interval, nextExecutionTime
- **JobExecution**: jobId, startTime, endTime, status, result, attempt
- **JobScheduler**: priority queue of scheduled jobs, thread pool, scheduler daemon thread

## Constraints
- Scheduler daemon thread wakes every second to check for due jobs
- Fixed-rate: next execution = lastScheduledTime + interval (regardless of execution duration)
- Fixed-delay: next execution = lastCompletionTime + delay
- Thread pool size configurable (default: CPU cores × 2)
- Retry backoff: exponential (2^attempt seconds)`,
    constraints: `- Priority queue: higher-priority ready jobs execute before lower-priority ones
- Thread pool bounded: max N concurrent jobs
- Fixed-rate: interval measured from last trigger time
- Fixed-delay: interval measured from last completion time
- Retry up to K times with exponential backoff`,
    hints: [
      "Use a PriorityQueue<Job> ordered by (nextExecutionTime ASC, priority DESC) \u2014 the scheduler thread polls this queue.",
    "Scheduler daemon: `while(running) { sleep(1s); checkAndDispatch(); }` \u2014 find all jobs with nextExecutionTime <= now.",
    "Use ScheduledExecutorService internally for timing, and a separate ExecutorService for job execution.",
    "Job retry: on failure, increment attempt counter; if attempts < maxRetries, re-enqueue with nextExecutionTime = now + 2^attempt seconds.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Job Scheduling System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAJobSchedulingSystem system = new DesignAJobSchedulingSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAJobSchedulingSystem {
    public DesignAJobSchedulingSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Job Scheduling System

class DesignAJobSchedulingSystem {
public:
    DesignAJobSchedulingSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAJobSchedulingSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Job Scheduling System

class DesignAJobSchedulingSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAJobSchedulingSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-job-scheduler-tc1",
        description: "Test case 1",
        input: "Schedule Job A (HIGH) at T+5s and Job B (LOW) at T+5s. Thread pool size = 1.",
        expectedOutput: "At T+5s: Job A executes first (higher priority). Job B waits. After Job A completes, Job B executes.",
        isHidden: false,
      },
      {
        id: "design-job-scheduler-tc2",
        description: "Test case 2",
        input: "Recurring job every 10 seconds, maxRetries=2. First execution throws exception.",
        expectedOutput: "Retry 1 after 2s, retry 2 after 4s. After 2 failures, job status = FAILED. Next scheduled run at T+10s still executes.",
        isHidden: true,
      },
    ],
  },
  {
    id: "25",
    slug: "design-monitoring-alert-system",
    title: "Design a Monitoring and Alert System",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Observer Pattern", "Thresholds", "Metrics", "Time Series", "Alert Management"],
    order: 25,
    description: `## Problem Statement

Design a production monitoring and alerting system like PagerDuty or Datadog alerts — where services emit metrics, alert rules are defined on thresholds, and notifications are triggered when conditions are met.

## Requirements

### Functional Requirements
- Register metrics sources (services/hosts)
- Record metric data points: (sourceId, metricName, value, timestamp)
- Define alert rules: metric + condition (>, <, ==) + threshold + duration window + severity
- Alert evaluation: continuously evaluate rules against incoming metrics
- Trigger alert when condition holds for the entire duration window
- Alert lifecycle: PENDING → FIRING → RESOLVED
- Notification channels: EMAIL, SLACK, PAGERDUTY, SMS
- Alert suppression: silence an alert for a configurable duration
- Dashboard: current metric values, active alerts, alert history
- Escalation: if alert not acknowledged within N minutes, escalate to next on-call

### Non-Functional Requirements
- Thread-safe metric ingestion
- Async alert evaluation
- Singleton MonitoringService

## Key Entities
- **MetricSource**: id, name, type (SERVICE/HOST/DATABASE)
- **MetricPoint**: sourceId, metricName, value, timestamp
- **AlertRule**: id, sourceId, metricName, condition, threshold, windowSeconds, severity, notificationChannels
- **Alert**: id, rule, status, firedAt, resolvedAt, annotations
- **MonitoringService**: Singleton; ingests metrics, evaluates rules, manages alerts

## Constraints
- Metric ingestion must be non-blocking
- Alert evaluation runs asynchronously every 30 seconds
- Duration window: alert fires only if condition holds for entire window (not just a single point)
- Duplicate alerts suppressed: same rule cannot fire twice within cooldown period`,
    constraints: `- Metric ingestion is non-blocking (async write to in-memory time series)
- Alert fires only if condition is true for all data points within the window
- Same alert rule cannot re-fire within cooldown period (default 5 minutes)
- Alert suppression overrides all rules during silence window
- Escalation triggers after acknowledgment timeout (configurable, default 30 minutes)`,
    hints: [
      "Store metrics as a sliding window: Map<(sourceId, metricName), Deque<MetricPoint>> \u2014 trim entries older than the alert window.",
    "Alert evaluation: for each rule, get the time series for the last `windowSeconds`, check if ALL points satisfy the condition.",
    "Observer pattern for notifications: AlertRule subscribes notification channels; on alert fire, notify all channels.",
    "Use a concurrent queue for metric ingestion; a background evaluator thread processes in batches.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Monitoring and Alert System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAMonitoringAndSystem system = new DesignAMonitoringAndSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAMonitoringAndSystem {
    public DesignAMonitoringAndSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Monitoring and Alert System

class DesignAMonitoringAndSystem {
public:
    DesignAMonitoringAndSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAMonitoringAndSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Monitoring and Alert System

class DesignAMonitoringAndSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAMonitoringAndSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-monitoring-alert-system-tc1",
        description: "Test case 1",
        input: "Rule: CPU > 90% for 60 seconds. CPU readings over last 60s: [92%, 95%, 91%, 93%].",
        expectedOutput: "All readings exceed 90%. Alert FIRES. Severity=HIGH. Email and Slack notifications sent.",
        isHidden: false,
      },
      {
        id: "design-monitoring-alert-system-tc2",
        description: "Test case 2",
        input: "Same rule. CPU readings: [92%, 95%, 88%, 93%] (one reading below threshold).",
        expectedOutput: "Condition not met for entire window (88% < 90%). Alert remains PENDING, not fired.",
        isHidden: true,
      },
    ],
  },
  {
    id: "26",
    slug: "design-document-collaboration",
    title: "Design a Document Collaboration System (Google Docs)",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Operational Transform", "Concurrency", "Collaboration", "Versioning", "Permissions"],
    order: 26,
    description: `## Problem Statement

Design a simplified real-time document collaboration system like Google Docs where multiple users can simultaneously edit a document, with conflict resolution, version history, and access control.

## Requirements

### Functional Requirements
- Create, read, update, delete documents
- Multiple users can edit the same document simultaneously
- Real-time sync: changes by one user visible to others immediately
- Conflict resolution: last-write-wins or simplified operational transform
- Document versioning: save checkpoints; view and restore previous versions
- Permissions: OWNER, EDITOR, VIEWER — granular access control
- Sharing: share via link (view-only or edit) or invite specific users
- Comments: attach comments to text ranges
- Offline editing: queue edits locally and sync when online

### Non-Functional Requirements
- Thread-safe concurrent edits
- Event-driven real-time sync using Observer pattern
- Singleton DocumentService

## Key Entities
- **Document**: id, title, content (StringBuilder), owner, version, collaborators, comments
- **Edit**: documentId, userId, operation (INSERT/DELETE/REPLACE), position, text, timestamp
- **Version**: id, documentId, content snapshot, savedAt, savedBy
- **Permission**: userId, documentId, role (OWNER/EDITOR/VIEWER)
- **Comment**: id, documentId, textRange, author, body, resolved
- **DocumentService**: Singleton; manages docs, edits, versions, permissions

## Constraints
- VIEWER cannot make edits
- Version history retains last 50 versions
- Concurrent edits from same document serialized via document-level lock
- Comments can only be added by EDITORs and OWNERs`,
    constraints: `- VIEWER permission is read-only
- Concurrent edits serialized per document (document-level lock)
- Version history: last 50 checkpoints retained
- Auto-save creates a version checkpoint every 5 minutes of activity
- Edit positions must be adjusted for concurrent insertions/deletions (basic OT)`,
    hints: [
      "Use a ReentrantLock per document for concurrent edit serialization \u2014 better than global lock.",
    "For simplified conflict resolution: apply edits in timestamp order; adjust positions for prior inserts/deletes.",
    "Version snapshots: store full document content at checkpoint \u2014 not just diffs for interview simplicity.",
    "Observer pattern: maintain a Set<UserSession> per document; broadcast each accepted edit to all active sessions.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Document Collaboration System (Google Docs)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignADocumentCollaSystem system = new DesignADocumentCollaSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignADocumentCollaSystem {
    public DesignADocumentCollaSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Document Collaboration System (Google Docs)

class DesignADocumentCollaSystem {
public:
    DesignADocumentCollaSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignADocumentCollaSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Document Collaboration System (Google Docs)

class DesignADocumentCollaSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignADocumentCollaSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-document-collaboration-tc1",
        description: "Test case 1",
        input: "User A (EDITOR) and User B (VIEWER) are on Document D1. User B tries to type.",
        expectedOutput: "Edit rejected for User B: VIEWER role has read-only access. Document unchanged.",
        isHidden: false,
      },
      {
        id: "design-document-collaboration-tc2",
        description: "Test case 2",
        input: "User A inserts 'Hello' at position 0. User B simultaneously inserts 'World ' at position 0.",
        expectedOutput: "Edits serialized. One of: 'Hello World ' or 'World Hello' \u2014 first edit wins. Both users see same final document.",
        isHidden: true,
      },
    ],
  },
  {
    id: "27",
    slug: "design-property-listing-platform",
    title: "Design a Property Listing Platform (Airbnb)",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Booking", "Search", "Availability Calendar", "Concurrency", "Reviews"],
    order: 27,
    description: `## Problem Statement

Design a property rental marketplace like Airbnb where hosts list properties, guests search and book stays, payments are processed, and reviews are exchanged — with concurrent booking prevention.

## Requirements

### Functional Requirements
- Host registration and property listing: address, type (APARTMENT/HOUSE/ROOM), amenities, photos, price/night, house rules
- Guest search: filter by location, dates, guests count, price range, amenities
- Availability calendar: hosts block dates; system tracks booked vs available dates
- Booking flow: search → select → hold (10 min) → pay → confirm
- Payment processing and host payout after check-in
- Reviews: guest reviews property after stay; host reviews guest
- Cancellation policies: FLEXIBLE, MODERATE, STRICT
- Messaging between host and guest
- Wishlist: guests save favorite listings

### Non-Functional Requirements
- Thread-safe date availability check and booking
- Singleton AirbnbService

## Key Entities
- **Property**: id, host, type, location, capacity, amenities, pricePerNight, availabilityCalendar, reviews
- **Booking**: id, guest, property, checkIn, checkOut, guestsCount, totalPrice, status
- **AvailabilityCalendar**: propertyId, blockedDates (Set<LocalDate>)
- **Review**: id, reviewer, reviewee, property, rating, comment, type (GUEST_FOR_HOST / HOST_FOR_GUEST)
- **Host/Guest**: user profiles with specific attributes
- **CancellationPolicy**: enum + refund calculation strategy

## Constraints
- Date overlap check must be atomic
- Booking hold expires in 10 minutes without payment
- Cancellation refund based on policy and days before check-in
- Host cannot book their own property
- Reviews only allowed after stay completion`,
    constraints: `- Date availability check and booking are atomic — no double-booking
- Booking hold expires in 10 minutes
- Reviews unlocked only after stay COMPLETED status
- Host cannot book their own property
- Cancellation refund calculated based on policy and notice period`,
    hints: [
      "Availability calendar: store a Set<LocalDate> of booked dates per property; check if (checkIn, checkOut) range overlaps with any booked date.",
    "Hold mechanism: two-phase commit \u2014 HOLD status for 10 minutes, transitions to CONFIRMED on payment or CANCELLED on timeout.",
    "Search: filter properties by date range availability first (most selective), then by location, then by amenities.",
    "Cancellation policy Strategy: FLEXIBLE refunds 100% up to 24h before; MODERATE 50% up to 5 days; STRICT no refund within 1 week.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Property Listing Platform (Airbnb)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAPropertyListiSystem system = new DesignAPropertyListiSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAPropertyListiSystem {
    public DesignAPropertyListiSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Property Listing Platform (Airbnb)

class DesignAPropertyListiSystem {
public:
    DesignAPropertyListiSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAPropertyListiSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Property Listing Platform (Airbnb)

class DesignAPropertyListiSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAPropertyListiSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-property-listing-platform-tc1",
        description: "Test case 1",
        input: "Guest books Property P1 for Dec 10\u201315. Another guest tries to book P1 for Dec 12\u201318.",
        expectedOutput: "First booking confirmed. Second booking rejected: 'Dec 12\u201315 dates not available for P1.'",
        isHidden: false,
      },
      {
        id: "design-property-listing-platform-tc2",
        description: "Test case 2",
        input: "Guest cancels MODERATE policy booking 3 days before check-in. Booking total = \u20b910,000.",
        expectedOutput: "Within 5-day moderate window. Refund = 50% = \u20b95,000. Cancellation confirmed. Dates freed on calendar.",
        isHidden: true,
      },
    ],
  },
  {
    id: "28",
    slug: "design-warehouse-management",
    title: "Design a Warehouse Management System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Inventory", "Location Management", "FIFO/LIFO", "Order Fulfillment", "Concurrency"],
    order: 28,
    description: `## Problem Statement

Design a warehouse management system that tracks inventory locations within a warehouse, manages inbound stock receipts, picks items to fulfill outbound orders, and optimizes storage space.

## Requirements

### Functional Requirements
- Warehouse layout: zones, aisles, shelves, bins — each bin has a location code and capacity
- Inbound: receive stock for a product; system assigns it to an available bin
- Outbound: fulfill an order — pick items from bins (FIFO order by receipt date)
- Inventory query: how many units of product X are in warehouse?
- Location query: where is product X stored? (list of bins)
- Transfer: move stock between bins
- Low stock alerts: notify when product quantity falls below reorder threshold
- Bin occupancy: how full is each bin? Can a given quantity fit?

### Non-Functional Requirements
- Thread-safe stock operations
- Singleton WarehouseService

## Key Entities
- **Bin**: locationCode, zone, aisle, shelf, capacity, currentOccupancy, stock (List<StockLot>)
- **StockLot**: productId, quantity, receivedDate (for FIFO)
- **Product**: id, name, SKU, unit, reorderThreshold
- **InboundOrder**: products and quantities received
- **OutboundOrder**: products and quantities to ship
- **WarehouseService**: Singleton; manages bins, stock, picks

## Constraints
- FIFO picking: oldest stock lots are picked first
- Bin cannot exceed its capacity
- Picking is atomic: all items in order picked or none
- Low stock alert fires when total product quantity < reorderThreshold`,
    constraints: `- FIFO stock picking: oldest lots picked first within each bin
- Bin capacity strictly enforced
- Outbound order picking is atomic (all or nothing)
- Thread-safe concurrent inbound/outbound operations
- Low stock notifications fire asynchronously`,
    hints: [
      "StockLot is sorted by receivedDate within each Bin \u2014 always pick from the front (oldest).",
    "For outbound pick: iterate bins containing the product sorted by oldest lot; deduct from each until order quantity fulfilled.",
    "Bin assignment for inbound: find bins for the product that have remaining capacity; prefer bins already containing that product.",
    "Low stock check: after every outbound pick, compare total stock for that product across all bins against reorderThreshold.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Warehouse Management System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAWarehouseManaSystem system = new DesignAWarehouseManaSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAWarehouseManaSystem {
    public DesignAWarehouseManaSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Warehouse Management System

class DesignAWarehouseManaSystem {
public:
    DesignAWarehouseManaSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAWarehouseManaSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Warehouse Management System

class DesignAWarehouseManaSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAWarehouseManaSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-warehouse-management-tc1",
        description: "Test case 1",
        input: "Product A: Bin B1 has 10 units (received Jan 1), Bin B2 has 5 units (received Jan 5). Pick 12 units.",
        expectedOutput: "Pick 10 from B1 (exhausted, Jan 1 oldest) + 2 from B2. B1 empty. B2 has 3 remaining.",
        isHidden: false,
      },
      {
        id: "design-warehouse-management-tc2",
        description: "Test case 2",
        input: "Product B reorder threshold = 20. Pick brings total to 18.",
        expectedOutput: "Low stock alert fired: 'Product B has 18 units remaining (below threshold of 20). Reorder recommended.'",
        isHidden: true,
      },
    ],
  },
  {
    id: "29",
    slug: "design-online-code-judge",
    title: "Design an Online Code Judge (LeetCode)",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Code Execution", "Sandboxing", "Test Cases", "Submission Queue", "Concurrency"],
    order: 29,
    description: `## Problem Statement

Design an online coding platform like LeetCode where users solve programming problems, submit code, the system executes it against test cases in a sandboxed environment, and results are returned with performance metrics.

## Requirements

### Functional Requirements
- Problem catalog: title, description, difficulty, constraints, sample test cases, hints, editorial
- User authentication and progress tracking (solved problems, submission history)
- Code editor: submit code in multiple languages (Java, Python, C++, JavaScript)
- Submission pipeline: code → queue → judge → result
- Judge evaluates: compile errors, runtime errors, wrong answer, time limit exceeded, memory limit exceeded, accepted
- Test cases: hidden test cases run in addition to sample cases
- Leaderboard: users ranked by problems solved and submission speed
- Discussion forum per problem
- Contest mode: timed contests with real-time leaderboard

### Non-Functional Requirements
- Async submission processing via queue
- Isolated execution sandbox per submission
- Thread-safe submission queue

## Key Entities
- **Problem**: id, title, description, difficulty, constraints, testCases, timelimit, memoryLimit, editorial
- **TestCase**: input, expectedOutput, hidden
- **Submission**: id, userId, problemId, language, code, status, executionTime, memoryUsed, submittedAt
- **SubmissionResult**: submissionId, verdict, failedTestCase, executionTime, memoryUsed
- **JudgeService**: executes code against test cases in isolation
- **SubmissionQueue**: async queue feeding workers

## Constraints
- Time limit per submission: problem-defined (default 2 seconds)
- Memory limit per submission: problem-defined (default 256 MB)
- Sandbox isolation prevents file system and network access
- Queue-based execution: max K concurrent judges`,
    constraints: `- Each submission runs in an isolated sandbox with time and memory limits
- Hidden test cases are never exposed to users
- Async processing: submission returns immediately with submission ID; user polls for result
- Partial evaluation: show which test case failed without revealing hidden test case input
- Thread-safe submission queue with bounded concurrency (K workers)`,
    hints: [
      "Model the Judge as a Worker that pulls from a SubmissionQueue \u2014 use a thread pool of K workers.",
    "Verdict enum: ACCEPTED, WRONG_ANSWER, TIME_LIMIT_EXCEEDED, MEMORY_LIMIT_EXCEEDED, COMPILE_ERROR, RUNTIME_ERROR.",
    "For execution isolation, model a Sandbox class that enforces time/memory limits (actual sandboxing uses OS primitives but model it conceptually).",
    "Submission status polling: store results in a Map<SubmissionId, SubmissionResult>; client polls until status is terminal.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design an Online Code Judge (LeetCode)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAnOnlineCodeJuSystem system = new DesignAnOnlineCodeJuSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAnOnlineCodeJuSystem {
    public DesignAnOnlineCodeJuSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design an Online Code Judge (LeetCode)

class DesignAnOnlineCodeJuSystem {
public:
    DesignAnOnlineCodeJuSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAnOnlineCodeJuSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design an Online Code Judge (LeetCode)

class DesignAnOnlineCodeJuSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAnOnlineCodeJuSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-online-code-judge-tc1",
        description: "Test case 1",
        input: "User submits correct Two Sum solution. All 15 test cases (3 sample + 12 hidden) pass within 100ms and 12MB.",
        expectedOutput: "Verdict: ACCEPTED. Execution time: 100ms. Memory: 12MB. Problem marked as Solved for user.",
        isHidden: false,
      },
      {
        id: "design-online-code-judge-tc2",
        description: "Test case 2",
        input: "User submits O(n^3) solution for a problem with n=10^5 and 2s time limit.",
        expectedOutput: "Verdict: TIME_LIMIT_EXCEEDED on Test Case 8. Execution time: >2000ms. User notified to optimize.",
        isHidden: true,
      },
    ],
  },
  {
    id: "30",
    slug: "design-file-storage-system",
    title: "Design a File Storage System (Dropbox)",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["File System", "Versioning", "Sync", "Permissions", "Chunk Upload"],
    order: 30,
    description: `## Problem Statement

Design a cloud file storage system like Dropbox where users can upload, organize, share, and sync files across devices — with versioning, chunked uploads, and access control.

## Requirements

### Functional Requirements
- Users upload and download files
- Folder hierarchy: create, rename, move, delete folders
- File operations: upload, download, rename, move, copy, delete
- Chunked upload: large files split into chunks and uploaded independently; reassembled server-side
- File versioning: keep last N versions of each file; restore any previous version
- Sharing: share file/folder with specific users (VIEW/EDIT) or via public link
- Sync: detect local changes and sync to cloud; pull remote changes to local
- Storage quota per user (e.g., 15 GB free)
- Search: find files by name, type, or content (filename only for interview)

### Non-Functional Requirements
- Concurrent uploads for same file handled safely
- Thread-safe file/folder metadata updates
- Singleton FileStorageService

## Key Entities
- **File**: id, name, size, type, owner, parentFolder, chunks, versions, createdAt, modifiedAt
- **Folder**: id, name, owner, parent, children (files and folders)
- **FileVersion**: versionNumber, fileId, content hash, size, savedAt
- **Chunk**: fileId, chunkIndex, hash, size, data
- **Permission**: userId, resourceId, resourceType, access (VIEW/EDIT)
- **FileStorageService**: Singleton

## Constraints
- Max file size: 10 GB
- Chunk size: 4 MB
- File versions: last 10 retained; older purged
- Storage quota enforced before upload
- Concurrent chunk uploads for same file: allowed (all chunks needed before assembly)`,
    constraints: `- Max file size 10 GB; chunk size 4 MB
- Storage quota must be checked before accepting upload
- Concurrent chunk uploads allowed; assembly triggered when all chunks received
- File versions: last 10 retained, older purged automatically
- Sharing links expire after configurable duration (default 7 days for public links)`,
    hints: [
      "Track upload state per file: a Map<fileId, Set<receivedChunkIndices>>; assembly triggered when Set size == totalChunks.",
    "File versioning: on each save, create a new FileVersion with content hash; maintain a version list per file (max 10).",
    "Quota check: user's used storage = sum of all file sizes; update atomically on upload/delete.",
    "Folder hierarchy: each Folder has a parentId; path resolution is recursive traversal up to root.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a File Storage System (Dropbox)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAFileStorageSySystem system = new DesignAFileStorageSySystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAFileStorageSySystem {
    public DesignAFileStorageSySystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a File Storage System (Dropbox)

class DesignAFileStorageSySystem {
public:
    DesignAFileStorageSySystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAFileStorageSySystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a File Storage System (Dropbox)

class DesignAFileStorageSySystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAFileStorageSySystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-file-storage-system-tc1",
        description: "Test case 1",
        input: "User uploads a 10 MB file in 4 MB chunks. Chunks 1 and 3 arrive first; Chunk 2 arrives last.",
        expectedOutput: "Chunks 1 and 3 stored. When Chunk 2 arrives, all 3 chunks present \u2192 file assembled \u2192 status: UPLOAD_COMPLETE.",
        isHidden: false,
      },
      {
        id: "design-file-storage-system-tc2",
        description: "Test case 2",
        input: "User has 14.8 GB used of 15 GB quota. Tries to upload 500 MB file.",
        expectedOutput: "Upload rejected: insufficient storage quota. (Would require 15.3 GB, quota is 15 GB.)",
        isHidden: true,
      },
    ],
  },
  {
    id: "31",
    slug: "design-api-gateway",
    title: "Design an API Gateway",
    difficulty: "Hard",
    category: "Design Patterns",
    tags: ["Rate Limiting", "Authentication", "Load Balancing", "Circuit Breaker", "Routing"],
    order: 31,
    description: `## Problem Statement

Design an API Gateway that acts as a single entry point for microservices — handling request routing, authentication, rate limiting, load balancing, and circuit breaking.

## Requirements

### Functional Requirements
- Route incoming HTTP requests to appropriate backend services based on URL path and method
- Authentication: validate API keys or JWT tokens before forwarding requests
- Rate limiting: per-client throttling (pluggable algorithm — token bucket default)
- Load balancing: distribute requests across multiple instances of a service (ROUND_ROBIN, WEIGHTED, LEAST_CONNECTIONS)
- Circuit breaker: stop routing to a failing service after N consecutive failures; retry after timeout
- Request/response transformation: add/remove headers, modify path
- Request logging and metrics collection (latency, error rate per route)
- Health checks: periodically probe backend instances; remove unhealthy ones

### Non-Functional Requirements
- Thread-safe routing and load balancing state
- Pluggable strategy for rate limiting and load balancing
- Singleton APIGateway

## Key Entities
- **Route**: path pattern, method, targetService, middleware chain
- **ServiceRegistry**: Map<serviceName, List<ServiceInstance>>
- **ServiceInstance**: host, port, weight, healthy, activeConnections
- **LoadBalancer** (interface): \`selectInstance(serviceName)\` — RoundRobin, Weighted, LeastConnections
- **CircuitBreaker**: per-service; states: CLOSED, OPEN, HALF_OPEN
- **RateLimiter**: per-client (reuse design from rate limiter problem)
- **APIGateway**: Singleton; request pipeline

## Constraints
- Circuit breaker opens after 5 consecutive failures; retries after 30 seconds in HALF_OPEN
- Rate limiting checked before routing (fail fast)
- Authentication checked before rate limiting
- Health checks run every 30 seconds`,
    constraints: `- Authentication → Rate Limiting → Circuit Breaker → Load Balancing → Forward (strict pipeline order)
- Circuit breaker: OPEN after 5 consecutive failures, HALF_OPEN after 30s, CLOSED after successful probe
- Health check interval: 30 seconds; unhealthy instances removed from rotation
- Thread-safe load balancer state (round-robin counter, connection counts)
- Request timeout: configurable per route (default 5 seconds)`,
    hints: [
      "Model the request pipeline as a Chain of Responsibility \u2014 each handler (auth, rate-limit, circuit-breaker, lb) either passes or short-circuits.",
    "Circuit breaker state machine: CLOSED (normal) \u2192 OPEN (failing) \u2192 HALF_OPEN (testing) \u2192 CLOSED (recovered).",
    "Round-robin: AtomicInteger counter modulo instanceCount \u2014 thread-safe increment.",
    "Service registry updates and health check removals must be synchronized to avoid routing to removed instances.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design an API Gateway
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAnApiGatewaySystem system = new DesignAnApiGatewaySystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAnApiGatewaySystem {
    public DesignAnApiGatewaySystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design an API Gateway

class DesignAnApiGatewaySystem {
public:
    DesignAnApiGatewaySystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAnApiGatewaySystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design an API Gateway

class DesignAnApiGatewaySystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAnApiGatewaySystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-api-gateway-tc1",
        description: "Test case 1",
        input: "Request to '/api/orders'. OrderService has 3 healthy instances. Load balancer = ROUND_ROBIN. 3 consecutive requests.",
        expectedOutput: "Request 1 \u2192 Instance A, Request 2 \u2192 Instance B, Request 3 \u2192 Instance C. Requests routed in rotation.",
        isHidden: false,
      },
      {
        id: "design-api-gateway-tc2",
        description: "Test case 2",
        input: "PaymentService instance fails 5 consecutive health checks.",
        expectedOutput: "Circuit breaker OPENS for PaymentService. Requests to '/api/payments' return 503 Service Unavailable immediately without backend calls.",
        isHidden: true,
      },
    ],
  },
  {
    id: "32",
    slug: "design-live-streaming-platform",
    title: "Design a Broadcast Live Streaming Platform",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Streaming", "Real-Time", "Observer Pattern", "Concurrency", "CDN"],
    order: 32,
    description: `## Problem Statement

Design a live streaming platform like Twitch or YouTube Live where streamers broadcast video, viewers join streams, interact through live chat, and platform tracks concurrent viewership.

## Requirements

### Functional Requirements
- Streamer creates a channel and goes live; stream has title, category, description
- Viewers can join and leave streams
- Live chat: viewers send messages visible to all current viewers
- Concurrent viewer count tracking
- Stream categories/tags for discovery (browse by category)
- Follow streamers; notify followers when streamer goes live
- Stream recording: auto-record live streams; VOD (video on demand) available after stream ends
- Subscription model: paid subscription to streamer for ad-free experience and exclusive emotes
- Moderation: ban/timeout users in chat, assign moderators

### Non-Functional Requirements
- Thread-safe viewer count and chat message management
- Async follower notifications
- Singleton StreamingPlatformService

## Key Entities
- **Streamer/Viewer**: user profiles
- **Stream**: id, streamer, title, category, status (LIVE/OFFLINE), viewerCount, startTime
- **Channel**: streamer's page; follower list, past streams (VODs)
- **ChatMessage**: id, sender, stream, content, timestamp
- **ChatRoom**: streamId, activeViewers, messages (bounded buffer), moderators
- **StreamingPlatformService**: Singleton

## Constraints
- Chat message history: last 500 messages per stream
- Viewer count is eventually consistent (update every 5 seconds)
- Banned users cannot send chat messages or rejoin the stream's chat
- VOD retention: 60 days for non-subscribers`,
    constraints: `- Chat history bounded at 500 messages per stream (circular buffer)
- Viewer count updated in batches every 5 seconds (eventually consistent)
- Banned users cannot rejoin chat
- Follower notifications are async and non-blocking for stream start
- VODs retained 60 days; subscribers retain indefinitely`,
    hints: [
      "ChatRoom maintains a fixed-size circular buffer (ArrayDeque with max size) for messages.",
    "Viewer count: use AtomicInteger for thread-safe increment/decrement on join/leave.",
    "Follower notifications: dispatch to an async thread pool when streamer goes live \u2014 do not block stream start.",
    "Observer pattern: Viewer implements StreamObserver; ChatRoom broadcasts new messages to all active viewers.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Broadcast Live Streaming Platform
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignABroadcastLiveSystem system = new DesignABroadcastLiveSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignABroadcastLiveSystem {
    public DesignABroadcastLiveSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Broadcast Live Streaming Platform

class DesignABroadcastLiveSystem {
public:
    DesignABroadcastLiveSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignABroadcastLiveSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Broadcast Live Streaming Platform

class DesignABroadcastLiveSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignABroadcastLiveSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-live-streaming-platform-tc1",
        description: "Test case 1",
        input: "Streamer goes live. 500 followers notified asynchronously. Stream title: 'Friday Night Gaming'.",
        expectedOutput: "Stream created with LIVE status. 500 follower notifications queued asynchronously. Stream appears in GAMING category feed.",
        isHidden: false,
      },
      {
        id: "design-live-streaming-platform-tc2",
        description: "Test case 2",
        input: "Moderator bans User X from chat during stream. User X attempts to send a message.",
        expectedOutput: "Message rejected: 'You are banned from this chat.' User X's message not delivered to viewers.",
        isHidden: true,
      },
    ],
  },
  {
    id: "33",
    slug: "design-smart-home-automation",
    title: "Design a Smart Home Automation System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Observer Pattern", "Command Pattern", "Device Management", "Automation Rules", "IoT"],
    order: 33,
    description: `## Problem Statement

Design a smart home automation system where users control IoT devices (lights, thermostats, locks, cameras), set automation rules (if X then Y), and manage scenes (preset device configurations).

## Requirements

### Functional Requirements
- Device types: LIGHT (on/off, brightness, color), THERMOSTAT (temperature, mode), DOOR_LOCK (locked/unlocked), CAMERA (recording on/off), FAN (speed), OUTLET (on/off)
- User can control any device: turn on/off, set attributes
- Scenes: named preset configurations (e.g., 'Movie Mode': dim lights, lower thermostat, lock doors)
- Automation rules: condition → action (e.g., 'If time = 10pm, turn off all lights')
- Rule conditions: time-based, sensor-based (motion detected, door opened), or device-state-based
- Room grouping: devices belong to rooms; control all devices in a room at once
- Device status history log
- Remote control via mobile (simulated as API calls)

### Non-Functional Requirements
- Thread-safe device state updates
- Observer pattern for rule evaluation on state changes
- Command pattern for device actions (supports undo)

## Key Entities
- **Device** (abstract): id, name, room, status, stateHistory; subclasses per device type
- **Room**: id, name, devices
- **Scene**: id, name, deviceStates (Map<DeviceId, TargetState>)
- **AutomationRule**: id, condition (Predicate), action (Command), enabled
- **Command** (interface): \`execute()\`, \`undo()\` — DeviceOnCommand, DeviceOffCommand, SetThermostatCommand etc.
- **HomeController**: Singleton; manages devices, rooms, scenes, rules

## Constraints
- Automation rules evaluated asynchronously on device state change
- Scene activation applies all device states atomically
- Device command history stored for undo support (last 10 commands per device)
- Rules can be enabled/disabled without deletion`,
    constraints: `- Scene activation is atomic — all device states applied together
- Automation rules evaluated asynchronously on trigger
- Last 10 commands per device stored for undo support
- Thread-safe device state updates
- Rules disabled at creation time by default (must be explicitly enabled)`,
    hints: [
      "Use Command Pattern for device actions \u2014 each command encapsulates the device, action, and previous state for undo.",
    "Observer Pattern for rules: HomeController is the subject; AutomationRule is the observer; state changes trigger rule evaluation.",
    "Scene implementation: iterate the deviceStates map and execute a command for each device.",
    "Rule condition as a Predicate<SystemState> \u2014 evaluated against current system snapshot when triggered.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Smart Home Automation System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignASmartHomeAutoSystem system = new DesignASmartHomeAutoSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignASmartHomeAutoSystem {
    public DesignASmartHomeAutoSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Smart Home Automation System

class DesignASmartHomeAutoSystem {
public:
    DesignASmartHomeAutoSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignASmartHomeAutoSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Smart Home Automation System

class DesignASmartHomeAutoSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignASmartHomeAutoSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-smart-home-automation-tc1",
        description: "Test case 1",
        input: "User activates 'Movie Mode' scene: {LivingRoomLight: dim to 20%, Thermostat: 22\u00b0C, FrontDoor: locked}.",
        expectedOutput: "All 3 devices updated atomically. LivingRoomLight \u2192 20% brightness. Thermostat \u2192 22\u00b0C. Door \u2192 LOCKED.",
        isHidden: false,
      },
      {
        id: "design-smart-home-automation-tc2",
        description: "Test case 2",
        input: "Automation rule: 'If time == 22:00, turn off all lights'. Time reaches 22:00.",
        expectedOutput: "Rule triggers asynchronously. All LIGHT devices across all rooms set to OFF. Action logged.",
        isHidden: true,
      },
    ],
  },
  {
    id: "34",
    slug: "design-subscription-billing",
    title: "Design a Subscription Billing System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Billing Cycle", "Plan Management", "Proration", "Payment Retry", "Invoicing"],
    order: 34,
    description: `## Problem Statement

Design a subscription billing and management system like Stripe Billing or Chargebee — handling subscription plans, billing cycles, invoicing, payment retries, upgrades/downgrades, and dunning.

## Requirements

### Functional Requirements
- Subscription plans: BASIC, PROFESSIONAL, ENTERPRISE — each with monthly/annual pricing, feature limits
- Customer subscribes to a plan; billing cycle starts on subscription date
- Auto-generate invoices at the start of each billing period
- Payment processing: attempt payment; on failure, retry with schedule (1, 3, 7, 14 days)
- Plan changes: upgrade (prorate immediately) or downgrade (effective next billing cycle)
- Cancellation: immediate (refund prorated amount) or end-of-period
- Invoice history and payment history per customer
- Free trial: configurable trial period before billing starts
- Dunning: suspend account after all payment retries exhausted

### Non-Functional Requirements
- Scheduled billing jobs run daily
- Thread-safe invoice and payment processing
- Singleton BillingService

## Key Entities
- **Plan**: id, name, priceMonthly, priceAnnual, features, limits
- **Subscription**: id, customer, plan, status, currentPeriodStart, currentPeriodEnd, cancelAt
- **Invoice**: id, subscription, amount, dueDate, status (DRAFT/OPEN/PAID/VOID), lineItems
- **Payment**: id, invoice, amount, status (PENDING/SUCCEEDED/FAILED), attemptNumber
- **BillingScheduler**: daily job that generates and collects invoices
- **BillingService**: Singleton

## Constraints
- Proration calculated as (remainingDays / totalDays) × planDiff for upgrades
- Free trial: no charge during trial period
- Retry schedule: day 1, day 3, day 7, day 14 after failure; suspend after all fail
- Annual plan discount: typically 20% over monthly`,
    constraints: `- Proration on upgrade: charge for remaining days of new plan minus credit for old plan
- Downgrade effective at end of current billing period (no immediate change)
- Free trial period: no invoice generated
- 4 payment retry attempts before subscription suspended
- Thread-safe invoice generation for concurrent billing runs`,
    hints: [
      "BillingScheduler runs daily: find all subscriptions with currentPeriodEnd == today and generate next invoice.",
    "Proration formula: remainingDays = (periodEnd \u2212 today); prorated = (remainingDays / periodLength) \u00d7 (newPlanPrice \u2212 oldPlanPrice).",
    "Payment retry: store PaymentAttempt(invoiceId, attemptNumber, scheduledDate); scheduler processes due retries.",
    "Subscription status enum: TRIAL, ACTIVE, PAST_DUE, SUSPENDED, CANCELLED.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Subscription Billing System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignASubscriptionBSystem system = new DesignASubscriptionBSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignASubscriptionBSystem {
    public DesignASubscriptionBSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Subscription Billing System

class DesignASubscriptionBSystem {
public:
    DesignASubscriptionBSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignASubscriptionBSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Subscription Billing System

class DesignASubscriptionBSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignASubscriptionBSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-subscription-billing-tc1",
        description: "Test case 1",
        input: "Customer on BASIC (\u20b9500/month) upgrades to PROFESSIONAL (\u20b91500/month) with 15 days left in billing cycle.",
        expectedOutput: "Proration charge = (15/30) \u00d7 (\u20b91500 \u2212 \u20b9500) = \u20b9500. Invoice generated immediately. New plan active now.",
        isHidden: false,
      },
      {
        id: "design-subscription-billing-tc2",
        description: "Test case 2",
        input: "Invoice payment fails. Retry on Day 1 fails. Retry on Day 3 fails. Day 7 fails. Day 14 fails.",
        expectedOutput: "All 4 retries exhausted. Subscription status \u2192 SUSPENDED. Customer notified to update payment method.",
        isHidden: true,
      },
    ],
  },
  {
    id: "35",
    slug: "design-event-ticketing-system",
    title: "Design an Event Ticketing System (Eventbrite)",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Ticketing", "QR Code", "Concurrency", "Check-in", "Organizer Dashboard"],
    order: 35,
    description: `## Problem Statement

Design an event ticketing platform like Eventbrite where organizers create events with multiple ticket tiers, attendees register and purchase tickets, and check-in is managed via QR codes.

## Requirements

### Functional Requirements
- Organizer creates events: title, description, venue, date/time, max capacity
- Ticket tiers per event: GENERAL, VIP, EARLY_BIRD — each with price, quantity, sale window
- Attendee browses events and purchases tickets
- Each purchased ticket gets a unique QR code
- Check-in: scan QR code at event entrance; validate and mark ticket as used
- Promo codes for ticket discounts
- Refunds: before event date only
- Attendee list: organizer views all registered attendees
- Waitlist for sold-out events
- Event capacity: total attendees across all tiers cannot exceed venue capacity

### Non-Functional Requirements
- Thread-safe ticket purchase (prevent overselling per tier)
- Singleton EventTicketingService

## Key Entities
- **Event**: id, organizer, title, venue, dateTime, capacity, ticketTiers, status
- **TicketTier**: id, event, type, price, quantity, sold, saleStart, saleEnd
- **Ticket**: id, attendee, event, tier, qrCode, status (VALID/USED/REFUNDED), purchaseDate
- **Attendee**: id, name, email, purchasedTickets
- **CheckIn**: ticketId, checkedInAt, checkedInBy

## Constraints
- Ticket purchase within tier sale window only
- Synchronized purchase: concurrent purchases of last ticket in tier handled atomically
- QR code is unique per ticket (UUID-based)
- Each ticket can be scanned only once (prevent re-entry)`,
    constraints: `- Tier quantity strictly enforced — synchronized purchase
- Ticket purchase only within saleStart–saleEnd window
- QR codes are globally unique
- Each QR code scannable only once (ticket USED after first scan)
- Refunds only before event date and time`,
    hints: [
      "Synchronize on TicketTier during purchase: check available = (quantity \u2212 sold) > 0, then increment sold atomically.",
    "QR code generation: UUID.randomUUID().toString() is sufficient for uniqueness in interviews.",
    "Check-in flow: scan QR \u2192 lookup ticket \u2192 validate status == VALID \u2192 set status = USED atomically.",
    "For waitlist, use the same FIFO queue pattern from other booking systems \u2014 notify on cancellation.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design an Event Ticketing System (Eventbrite)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAnEventTicketiSystem system = new DesignAnEventTicketiSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAnEventTicketiSystem {
    public DesignAnEventTicketiSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design an Event Ticketing System (Eventbrite)

class DesignAnEventTicketiSystem {
public:
    DesignAnEventTicketiSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAnEventTicketiSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design an Event Ticketing System (Eventbrite)

class DesignAnEventTicketiSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAnEventTicketiSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-event-ticketing-system-tc1",
        description: "Test case 1",
        input: "EARLY_BIRD tier: 100 tickets. 100 already sold. Attendee A tries to buy 1 EARLY_BIRD ticket.",
        expectedOutput: "Purchase rejected: EARLY_BIRD tier sold out. A offered: would you like to join the waitlist?",
        isHidden: false,
      },
      {
        id: "design-event-ticketing-system-tc2",
        description: "Test case 2",
        input: "Attendee B scans QR code QR-12345 at event entrance. Ticket status = VALID.",
        expectedOutput: "Check-in successful. Ticket QR-12345 marked as USED. 'Welcome, [Attendee B name]!' displayed.",
        isHidden: true,
      },
    ],
  },
  {
    id: "36",
    slug: "design-chess-move-validator",
    title: "Design a Chess Validator (Move Validator Only)",
    difficulty: "Medium",
    category: "Games",
    tags: ["Validation", "Board Games", "OOP", "Bitboard", "Rule Engine"],
    order: 36,
    description: `## Problem Statement

Design a chess move validator that, given a board state and a proposed move, determines if the move is legal according to standard chess rules — without building a full game engine.

## Requirements

### Functional Requirements
- Represent board state as a 2D grid with piece information
- \`isValidMove(board, move)\` → boolean
- Validate piece-specific movement rules for all 6 piece types
- Check path clearance for sliding pieces (rook, bishop, queen)
- Validate that the move does not leave the moving player's king in check
- Support special moves: castling (both sides), en passant, pawn promotion
- \`getValidMoves(board, position)\` → List<Move> for a given piece
- \`isInCheck(board, color)\` → boolean
- \`isCheckmate(board, color)\` → boolean

### Non-Functional Requirements
- Stateless validator — does not maintain game state
- Extensible for chess variants (Chess960 etc.)

## Key Entities
- **Board**: 8×8 Cell grid + castling rights flags + en passant target square
- **Cell**: row, col, piece (nullable)
- **Piece**: type (KING/QUEEN/ROOK/BISHOP/KNIGHT/PAWN), color
- **Move**: fromCell, toCell, promotionPiece (optional), isCastling, isEnPassant
- **ChessValidator**: stateless; all methods are pure functions taking Board and Move

## Constraints
- Validation must be stateless — board and move are the only inputs
- isCheckmate requires generating all possible moves (expensive but correct)
- Castling requires: king and rook have not moved, no pieces between them, king not in check, king does not pass through check
- En passant: only valid on the move immediately following a two-square pawn advance`,
    constraints: `- Validator is stateless — no internal state, only inputs
- All 6 piece types must have correct movement validation
- Castling: neither king nor rook may have moved previously
- En passant: only valid immediately after the triggering pawn double-advance
- Move is invalid if it leaves moving player's king in check`,
    hints: [
      "For each piece type, implement a `getPseudoLegalMoves()` that ignores check \u2014 then filter for legality by simulating the move and checking if king is attacked.",
    "isInCheck: generate all opponent piece attack squares; if king's position is in that set, king is in check.",
    "For sliding pieces (rook, bishop, queen), iterate in each direction until you hit the board edge or another piece.",
    "isCheckmate: getValidMoves for all pieces of that color; if the combined list is empty AND isInCheck \u2192 checkmate.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Chess Validator (Move Validator Only)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAChessValidatoSystem system = new DesignAChessValidatoSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAChessValidatoSystem {
    public DesignAChessValidatoSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Chess Validator (Move Validator Only)

class DesignAChessValidatoSystem {
public:
    DesignAChessValidatoSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAChessValidatoSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Chess Validator (Move Validator Only)

class DesignAChessValidatoSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAChessValidatoSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-chess-move-validator-tc1",
        description: "Test case 1",
        input: "White King at e1. White Rook at h1. No pieces between them. Neither has moved. isValidMove(board, castle_kingside).",
        expectedOutput: "true \u2014 castling is legal. King moves to g1, Rook moves to f1.",
        isHidden: false,
      },
      {
        id: "design-chess-move-validator-tc2",
        description: "Test case 2",
        input: "White Knight at d4. Proposed move to e6.",
        expectedOutput: "true \u2014 L-shape (2 up, 1 right) is a valid knight move. No path clearance needed.",
        isHidden: true,
      },
    ],
  },
  {
    id: "37",
    slug: "design-survey-platform",
    title: "Design a Survey and Polling Platform",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Form Builder", "Analytics", "Multiple Question Types", "Submission Tracking"],
    order: 37,
    description: `## Problem Statement

Design a survey and polling platform like Google Forms or SurveyMonkey where users create surveys with multiple question types, distribute them, collect responses, and view analytics.

## Requirements

### Functional Requirements
- Create surveys: title, description, questions (ordered list)
- Question types: MULTIPLE_CHOICE (single select), CHECKBOX (multi-select), TEXT (free-form), RATING (1–5), YES_NO
- Question properties: text, required flag, options (for MC/Checkbox)
- Survey states: DRAFT, ACTIVE, CLOSED
- Distribute via shareable link
- Respondent submits answers (one submission per respondent by email)
- Prevent duplicate submissions from same email
- Analytics: per-question response distribution, total responses, completion rate
- Export results to CSV format (modeled as a List<List<String>>)
- Survey close: manual or auto-close on response limit

### Non-Functional Requirements
- Thread-safe response submission
- Singleton SurveyService

## Key Entities
- **Survey**: id, creator, title, description, questions, status, responseLimit, responses
- **Question**: id, text, type, required, options (for MC/Checkbox)
- **Response**: id, survey, respondentEmail, answers (Map<QuestionId, Answer>), submittedAt
- **Answer**: questionId, selectedOptions (for MC/Checkbox), textValue (for Text), ratingValue
- **SurveyAnalytics**: questionId → Map<option, count> for choice questions

## Constraints
- Required questions must be answered before submission accepted
- Duplicate submission (same email) rejected
- Survey must be ACTIVE to accept responses
- Response limit: if set, auto-close survey on reaching limit`,
    constraints: `- Required questions must be answered
- Duplicate email submissions rejected
- Survey must be in ACTIVE state to accept responses
- Auto-close when response limit reached (if configured)
- Thread-safe: concurrent submissions must not exceed response limit`,
    hints: [
      "Store respondent emails in a Set<String> per survey for O(1) duplicate check.",
    "Validate responses before storing: check all required questions are answered, MULTIPLE_CHOICE has exactly 1 answer, etc.",
    "Analytics computation: iterate all responses, aggregate answer counts per question \u2014 done lazily on request.",
    "AtomicInteger for response count \u2014 compare-and-set before accepting new submission when response limit is set.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Survey and Polling Platform
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignASurveyAndPollSystem system = new DesignASurveyAndPollSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignASurveyAndPollSystem {
    public DesignASurveyAndPollSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Survey and Polling Platform

class DesignASurveyAndPollSystem {
public:
    DesignASurveyAndPollSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignASurveyAndPollSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Survey and Polling Platform

class DesignASurveyAndPollSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignASurveyAndPollSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-survey-platform-tc1",
        description: "Test case 1",
        input: "Survey has 2 required questions. Respondent submits answers for only 1 required question.",
        expectedOutput: "Submission rejected: 'Question 2 is required.' Response not stored.",
        isHidden: false,
      },
      {
        id: "design-survey-platform-tc2",
        description: "Test case 2",
        input: "Survey with response limit = 100. 100 submissions received. 101st respondent tries to submit.",
        expectedOutput: "Survey auto-closed after 100th response. 101st submission rejected: 'This survey is no longer accepting responses.'",
        isHidden: true,
      },
    ],
  },
  {
    id: "38",
    slug: "design-rbac-system",
    title: "Design a Role-Based Access Control System",
    difficulty: "Medium",
    category: "Design Patterns",
    tags: ["RBAC", "Authorization", "Permissions", "Hierarchy", "Security"],
    order: 38,
    description: `## Problem Statement

Design a Role-Based Access Control (RBAC) system that manages users, roles, permissions, and resource access decisions — supporting role inheritance and dynamic permission assignment.

## Requirements

### Functional Requirements
- Create users, roles, and permissions
- Assign roles to users; assign permissions to roles
- Role hierarchy: roles can inherit from parent roles (inherit all parent permissions)
- \`hasPermission(userId, resource, action)\` → boolean
- Permission format: resource + action (e.g., 'document:read', 'user:delete', 'report:write')
- Wildcard permissions: 'document:*' grants all actions on document
- Temporarily grant extra permissions to a user (with expiry)
- Revoke role or permission at any time
- Audit log: record every authorization check with result

### Non-Functional Requirements
- Thread-safe permission checks
- Efficient hasPermission O(depth of role hierarchy)
- Singleton RBACService

## Key Entities
- **User**: id, name, roles, temporaryPermissions (with expiry)
- **Role**: id, name, permissions, parentRole (nullable)
- **Permission**: resource, action; \`matches(Permission other)\` handles wildcards
- **TemporaryPermission**: permission, expiresAt, userId
- **RBACService**: Singleton; manages entities, evaluates hasPermission

## Constraints
- Role hierarchy must be acyclic (no circular inheritance)
- Temporary permissions expire automatically
- hasPermission checks user direct permissions, temporary permissions (non-expired), and all roles recursively
- Wildcard action '*' matches any action for that resource`,
    constraints: `- Role hierarchy must be a DAG — no circular inheritance
- hasPermission must check: direct user permissions → temporary (non-expired) → roles recursively up hierarchy
- Wildcard 'resource:*' grants all actions on that resource
- Thread-safe permission evaluation
- Temporary permissions checked for expiry at evaluation time`,
    hints: [
      "hasPermission: check user's own permissions first, then iterate user's roles; for each role, recursively check parentRole.",
    "Wildcard matching: when checking if Permission A satisfies required Permission B, match if A.action == '*' and A.resource == B.resource.",
    "To detect circular role inheritance, use DFS with a visited set during role creation.",
    "Audit log: append (userId, resource, action, result, timestamp) to a thread-safe log on every hasPermission call.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Role-Based Access Control System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignARolebasedAcceSystem system = new DesignARolebasedAcceSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignARolebasedAcceSystem {
    public DesignARolebasedAcceSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Role-Based Access Control System

class DesignARolebasedAcceSystem {
public:
    DesignARolebasedAcceSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignARolebasedAcceSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Role-Based Access Control System

class DesignARolebasedAcceSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignARolebasedAcceSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-rbac-system-tc1",
        description: "Test case 1",
        input: "User U1 has Role 'editor'. Role 'editor' extends Role 'viewer'. Role 'viewer' has permission 'document:read'. hasPermission(U1, 'document', 'read').",
        expectedOutput: "true \u2014 inherited through editor \u2192 viewer \u2192 document:read.",
        isHidden: false,
      },
      {
        id: "design-rbac-system-tc2",
        description: "Test case 2",
        input: "User U2 granted temporary permission 'report:write' expiring in 1 hour. Check at 30 min: hasPermission(U2, 'report', 'write'). Check at 2 hours.",
        expectedOutput: "At 30 min: true. At 2 hours: false (temporary permission expired).",
        isHidden: true,
      },
    ],
  },
  {
    id: "39",
    slug: "design-blockchain-ledger",
    title: "Design a Blockchain Ledger (Simplified)",
    difficulty: "Hard",
    category: "Data Structures",
    tags: ["Blockchain", "Hashing", "Immutability", "Consensus", "Linked List"],
    order: 39,
    description: `## Problem Statement

Design a simplified blockchain ledger that demonstrates core blockchain concepts: blocks containing transactions, cryptographic linking via hashes, proof-of-work mining, and tamper detection — in memory.

## Requirements

### Functional Requirements
- Transaction: sender, receiver, amount, timestamp, unique ID
- Block: index, list of transactions, timestamp, previousHash, currentHash, nonce (for PoW)
- Genesis block: first block with previousHash = '0000...'
- Mine a block: find a nonce such that SHA256(block content + nonce) starts with N leading zeros (difficulty)
- Add mined block to chain
- Validate chain: verify each block's hash and previousHash linkage
- Tamper detection: if any block is modified, validation fails from that block onward
- Transaction pool: pending transactions waiting to be included in next block
- View all transactions for a given wallet address

### Non-Functional Requirements
- Thread-safe chain append
- Singleton BlockchainService

## Key Entities
- **Transaction**: id, sender, receiver, amount, timestamp
- **Block**: index, transactions, timestamp, previousHash, hash, nonce
- **Blockchain**: chain (List<Block>), pendingTransactions, difficulty
- **MiningService**: finds nonce for PoW; computes block hash
- **BlockchainService**: Singleton; manages transactions, mining, validation

## Constraints
- Difficulty = number of leading zeros required in block hash (default 4)
- Block capacity: max 10 transactions per block
- Once a block is added to the chain, it is immutable
- Chain validation must be O(n) in chain length`,
    constraints: `- Mining required before block can be added to chain
- Difficulty: hash must start with \`difficulty\` leading zero characters
- Max 10 transactions per block
- Chain validation: O(n) — verify hashes sequentially
- Thread-safe chain append — only one block can be mined and appended at a time`,
    hints: [
      "Block hash = SHA256(index + previousHash + timestamp + transactions + nonce) \u2014 any change to block content changes the hash.",
    "Mining loop: increment nonce until hash.startsWith('0'.repeat(difficulty)).",
    "Tamper detection: if block[i].hash != computeHash(block[i]) OR block[i].previousHash != block[i-1].hash \u2192 chain invalid.",
    "Use a simple SHA256 hex string; in Java: MessageDigest.getInstance('SHA-256').",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Blockchain Ledger (Simplified)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignABlockchainLedSystem system = new DesignABlockchainLedSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignABlockchainLedSystem {
    public DesignABlockchainLedSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Blockchain Ledger (Simplified)

class DesignABlockchainLedSystem {
public:
    DesignABlockchainLedSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignABlockchainLedSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Blockchain Ledger (Simplified)

class DesignABlockchainLedSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignABlockchainLedSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-blockchain-ledger-tc1",
        description: "Test case 1",
        input: "Add 3 transactions to pool. Mine block with difficulty=3. Add to chain.",
        expectedOutput: "Block mined: nonce found where hash starts with '000'. Block appended. Chain length = 2 (genesis + block 1).",
        isHidden: false,
      },
      {
        id: "design-blockchain-ledger-tc2",
        description: "Test case 2",
        input: "Manually change the amount in Block 1's first transaction. Run validateChain().",
        expectedOutput: "Validation fails at Block 1: computed hash no longer matches stored hash. Chain is invalid.",
        isHidden: true,
      },
    ],
  },
  {
    id: "40",
    slug: "design-unique-id-generator",
    title: "Design a Unique ID Generator (Snowflake)",
    difficulty: "Medium",
    category: "Concurrency",
    tags: ["Distributed Systems", "Snowflake", "Bit Manipulation", "Monotonic IDs", "Concurrency"],
    order: 40,
    description: `## Problem Statement

Design a distributed unique ID generation service like Twitter Snowflake that generates globally unique, time-ordered, 64-bit integer IDs — supporting high throughput (millions of IDs per second) with no coordination between nodes.

## Requirements

### Functional Requirements
- \`generateId()\` → returns a unique 64-bit long integer
- IDs must be roughly time-ordered (sortable by generation time)
- Support multiple nodes/workers (each with a unique worker ID) — no cross-node coordination
- Each node can generate up to 4096 IDs per millisecond
- Extract timestamp, worker ID, and sequence from a generated ID
- Handle clock skew: if system clock goes backward, wait or throw exception
- Thread-safe: concurrent ID generation on same node

### Non-Functional Requirements
- O(1) ID generation
- Single IdGenerator instance per node (Singleton)
- Configurable bit allocation

## Key Entities
- **IdGenerator**: Singleton; workerId, datacenterId, sequence, lastTimestamp
- **SnowflakeId** structure (64 bits): 1 bit sign + 41 bits timestamp (ms since epoch) + 5 bits datacenterId + 5 bits workerId + 12 bits sequence
- \`generateId()\`: get current ms timestamp, handle clock skew, increment sequence (reset at new ms), combine bits via shift/OR

## Constraints
- Timestamp: 41 bits = 69 years of IDs from custom epoch
- Sequence: 12 bits = 4096 IDs per millisecond per worker
- WorkerId + DatacenterId: 10 bits total = 1024 unique nodes
- Thread-safe via synchronized generateId method
- Clock going backward by >5ms must throw exception`,
    constraints: `- 41-bit timestamp (ms since custom epoch)
- 5-bit datacenterId + 5-bit workerId = 1024 unique nodes
- 12-bit sequence per ms = 4096 IDs/ms/node
- Clock skew ≤5ms: wait for clock to catch up; >5ms: throw ClockBackwardException
- Thread-safe: synchronized generateId()`,
    hints: [
      "ID composition: `(timestamp << 22) | (datacenterId << 17) | (workerId << 12) | sequence`",
    "On same millisecond: increment sequence; if sequence overflows 4096, spin-wait until next millisecond.",
    "Custom epoch (e.g., 2024-01-01 00:00:00 UTC) keeps the 41-bit timestamp useful for longer \u2014 store as constant.",
    "Extraction: `timestamp = id >> 22`, `datacenterId = (id >> 17) & 0x1F`, `workerId = (id >> 12) & 0x1F`, `sequence = id & 0xFFF`.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Unique ID Generator (Snowflake)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAUniqueIdGenerSystem system = new DesignAUniqueIdGenerSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAUniqueIdGenerSystem {
    public DesignAUniqueIdGenerSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Unique ID Generator (Snowflake)

class DesignAUniqueIdGenerSystem {
public:
    DesignAUniqueIdGenerSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAUniqueIdGenerSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Unique ID Generator (Snowflake)

class DesignAUniqueIdGenerSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAUniqueIdGenerSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-unique-id-generator-tc1",
        description: "Test case 1",
        input: "Worker 1, Datacenter 1. Generate 3 IDs at the same millisecond (T=1000).",
        expectedOutput: "ID1: encodes (T=1000, DC=1, W=1, seq=0). ID2: seq=1. ID3: seq=2. IDs are monotonically increasing.",
        isHidden: false,
      },
      {
        id: "design-unique-id-generator-tc2",
        description: "Test case 2",
        input: "System clock jumps backward 10ms during generateId().",
        expectedOutput: "ClockBackwardException thrown: 'Clock moved backwards by 10ms. Refusing to generate IDs.'",
        isHidden: true,
      },
    ],
  },
  {
    id: "41",
    slug: "design-inventory-management",
    title: "Design an Inventory Management System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Stock Management", "Reorder", "Multi-Location", "CRUD", "Reporting"],
    order: 41,
    description: `## Problem Statement

Design an inventory management system for a retail business — tracking stock levels across multiple locations, handling stock movements (receipts, sales, transfers), and triggering reorder alerts.

## Requirements

### Functional Requirements
- Product catalog: SKU, name, category, unit of measure, reorder threshold, reorder quantity
- Multiple warehouse/store locations
- Stock movements: RECEIVE (inbound), SELL (outbound), TRANSFER (location to location), ADJUST (manual correction)
- Real-time stock level per product per location
- Total stock across all locations per product
- Low stock alert: trigger when total stock < reorderThreshold
- Reorder suggestion: suggest reorder quantity when alert fires
- Stock history: audit trail of all movements per product
- Reports: stock value report (quantity × unit cost), turnover rate

### Non-Functional Requirements
- Thread-safe stock updates
- Singleton InventoryService

## Key Entities
- **Product**: sku, name, category, unitCost, reorderThreshold, reorderQuantity
- **Location**: id, name, type (WAREHOUSE/STORE)
- **Stock**: productSku, locationId, quantity
- **StockMovement**: id, product, fromLocation, toLocation, type, quantity, timestamp, reason
- **InventoryService**: Singleton; manages stock, movements, alerts

## Constraints
- Stock quantity cannot go negative (overselling blocked)
- Transfer requires sufficient stock at source location
- Adjust movement can be negative (correction) or positive (found stock)
- Thread-safe: concurrent sales must not allow overselling`,
    constraints: `- Stock quantity >= 0 at all times
- Transfers blocked if source location has insufficient stock
- ADJUST movements can be positive or negative
- Thread-safe: concurrent SELL operations cannot oversell
- Reorder alert fires asynchronously when threshold crossed`,
    hints: [
      "Stock is a Map<(SKU, LocationId), Integer>; synchronize on the specific (SKU, LocationId) pair for concurrent updates.",
    "StockMovement is the audit log \u2014 append-only; stock levels are derived by replaying movements (or maintained as running totals).",
    "Low stock check: after each SELL, compute total stock across all locations for that SKU and compare to threshold.",
    "Transfer is two operations atomically: deduct from source AND add to destination, both in one synchronized block.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design an Inventory Management System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAnInventoryManSystem system = new DesignAnInventoryManSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAnInventoryManSystem {
    public DesignAnInventoryManSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design an Inventory Management System

class DesignAnInventoryManSystem {
public:
    DesignAnInventoryManSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAnInventoryManSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design an Inventory Management System

class DesignAnInventoryManSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAnInventoryManSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-inventory-management-tc1",
        description: "Test case 1",
        input: "Product P1 at Warehouse W1: quantity=5. Two concurrent SELL orders each for 4 units.",
        expectedOutput: "First SELL succeeds. P1 quantity = 1. Second SELL rejected: insufficient stock (only 1 unit remaining).",
        isHidden: false,
      },
      {
        id: "design-inventory-management-tc2",
        description: "Test case 2",
        input: "Product P2 total stock across all locations = 18. Reorder threshold = 20.",
        expectedOutput: "Low stock alert fired: 'P2 below reorder threshold. Suggest reordering 50 units (configured reorder qty).'",
        isHidden: true,
      },
    ],
  },
  {
    id: "42",
    slug: "design-p2p-payment-venmo",
    title: "Design a Peer-to-Peer Payment System (Venmo)",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Payments", "Social Feed", "Concurrency", "Balance Management", "Activity Feed"],
    order: 42,
    description: `## Problem Statement

Design a P2P payment app like Venmo where users send/request money from friends, add social notes to transactions, and view a social activity feed of public payments.

## Requirements

### Functional Requirements
- User registration with linked bank account/card
- Add friends and manage friend list
- Send money: specify recipient, amount, note, visibility (PUBLIC/FRIENDS/PRIVATE)
- Request money: send a payment request; recipient can accept or decline
- Wallet balance: add money from bank, withdraw to bank
- Social feed: view friends' public and friends-only transactions with emoji reactions
- Notifications: receive alert when money received, request received, or request paid
- Transaction history: all sent/received payments
- Split payment request: request specific amounts from multiple people simultaneously

### Non-Functional Requirements
- Thread-safe balance operations
- Singleton VenmoService

## Key Entities
- **User**: id, name, username, email, balance, friends, transactions
- **Payment**: id, sender, receiver, amount, note, visibility, status (COMPLETED/PENDING/DECLINED), timestamp
- **PaymentRequest**: id, requester, requestee, amount, note, status
- **FeedItem**: paymentId, displayText, visibility, reactions
- **VenmoService**: Singleton

## Constraints
- Balance cannot go negative (insufficient funds → payment rejected)
- Payment requests expire after 30 days if not responded to
- PRIVATE payments invisible in social feed
- Reactions only on PUBLIC and FRIENDS payments
- Thread-safe balance deduction (concurrent payments)`,
    constraints: `- Balance cannot go negative
- Payment requests expire after 30 days
- PRIVATE payments excluded from all social feeds
- Reactions available on PUBLIC and FRIENDS-visibility payments only
- Thread-safe concurrent payment processing`,
    hints: [
      "Balance deduction: synchronized check-and-deduct: `if (balance >= amount) { balance -= amount; } else { throw InsufficientFunds; }`",
    "Social feed: collect all payments from friends where visibility is PUBLIC or FRIENDS, sort by timestamp descending.",
    "PaymentRequest timeout: store expiresAt timestamp; check on any status query \u2014 auto-expire on access.",
    "Split payment: create N individual PaymentRequests in a loop; each requestee responds independently.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Peer-to-Peer Payment System (Venmo)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAPeertopeerPaySystem system = new DesignAPeertopeerPaySystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAPeertopeerPaySystem {
    public DesignAPeertopeerPaySystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Peer-to-Peer Payment System (Venmo)

class DesignAPeertopeerPaySystem {
public:
    DesignAPeertopeerPaySystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAPeertopeerPaySystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Peer-to-Peer Payment System (Venmo)

class DesignAPeertopeerPaySystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAPeertopeerPaySystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-p2p-payment-venmo-tc1",
        description: "Test case 1",
        input: "User A (balance \u20b9500) sends \u20b9300 to User B with note '\ud83c\udf55 pizza', visibility=FRIENDS.",
        expectedOutput: "Payment completed. A balance \u2192 \u20b9200. B balance +\u20b9300. Feed item visible to A and B's mutual friends.",
        isHidden: false,
      },
      {
        id: "design-p2p-payment-venmo-tc2",
        description: "Test case 2",
        input: "User C (balance \u20b950) tries to send \u20b9200 to User D.",
        expectedOutput: "Payment rejected: insufficient balance. C has \u20b950; payment requires \u20b9200.",
        isHidden: true,
      },
    ],
  },
  {
    id: "43",
    slug: "design-kyc-verification",
    title: "Design a KYC Verification System",
    difficulty: "Medium",
    category: "Real World Systems",
    tags: ["Document Verification", "State Machine", "Workflow", "Compliance", "Identity"],
    order: 43,
    description: `## Problem Statement

Design a Know Your Customer (KYC) verification system used in fintech/banking applications to verify user identity through document submission, automated checks, and manual review workflows.

## Requirements

### Functional Requirements
- Customer submits KYC application: personal details (name, DOB, address, nationality)
- Document upload: ID proof (passport, national ID, driver's license) + address proof
- Automated checks: document format validation, OCR data extraction, face match with selfie
- Risk scoring: assign risk level (LOW, MEDIUM, HIGH) based on checks
- Manual review queue: HIGH risk cases sent to compliance officer for review
- Application states: SUBMITTED → DOCUMENTS_VERIFIED → AUTO_CHECKED → PENDING_REVIEW (if HIGH risk) → APPROVED / REJECTED
- Rejection reasons: document expired, mismatch, face mismatch, blacklisted
- Re-submission: customer can re-submit after rejection with new documents
- Audit trail: every state change logged with timestamp and actor

### Non-Functional Requirements
- Async document verification pipeline
- Thread-safe status updates
- Singleton KYCService

## Key Entities
- **KYCApplication**: id, customerId, status, documents, riskScore, checks, auditLog
- **Document**: id, type (ID_PROOF/ADDRESS_PROOF), fileUrl, status, extractedData
- **AutomatedCheck**: type (OCR/FACE_MATCH/EXPIRY_CHECK/BLACKLIST), result, details
- **ComplianceOfficer**: id, name, queue (List<KYCApplication>)
- **KYCService**: Singleton; orchestrates the pipeline

## Constraints
- Documents must not be expired (verified against submission date)
- Face match confidence must be >= 85% to pass
- HIGH risk applications always require manual review
- Re-submission allowed max 3 times before permanent rejection`,
    constraints: `- Document expiry validated at submission time
- Face match confidence threshold: 85%
- HIGH risk mandates manual review — cannot auto-approve
- Maximum 3 resubmission attempts before permanent rejection
- All state transitions logged to audit trail`,
    hints: [
      "State Machine for KYCApplication \u2014 each state has defined next states and required conditions.",
    "Pipeline: submit \u2192 validate documents \u2192 run automated checks (OCR, face match, expiry) \u2192 compute risk score \u2192 route accordingly.",
    "Risk scoring: LOW (all checks pass), MEDIUM (minor issues), HIGH (face mismatch or blacklist hit).",
    "Manual review queue is a PriorityQueue ordered by submission date \u2014 compliance officers process FIFO.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a KYC Verification System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAKycVerificatiSystem system = new DesignAKycVerificatiSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAKycVerificatiSystem {
    public DesignAKycVerificatiSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a KYC Verification System

class DesignAKycVerificatiSystem {
public:
    DesignAKycVerificatiSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAKycVerificatiSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a KYC Verification System

class DesignAKycVerificatiSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAKycVerificatiSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-kyc-verification-tc1",
        description: "Test case 1",
        input: "Customer submits KYC with valid passport + address proof. All automated checks pass. Risk = LOW.",
        expectedOutput: "Application auto-approved. Status: APPROVED. Notification sent to customer.",
        isHidden: false,
      },
      {
        id: "design-kyc-verification-tc2",
        description: "Test case 2",
        input: "Customer's face match confidence = 72% (below 85% threshold). Risk = HIGH.",
        expectedOutput: "Auto-check fails face match. Risk = HIGH. Application status \u2192 PENDING_REVIEW. Added to compliance officer queue.",
        isHidden: true,
      },
    ],
  },
  {
    id: "44",
    slug: "design-concurrent-hashmap",
    title: "Design a Concurrent HashMap (Thread-Safe HashMap)",
    difficulty: "Hard",
    category: "Concurrency",
    tags: ["Concurrency", "Data Structures", "Hashing", "Bucket Locking", "Read-Write Lock"],
    order: 44,
    description: `## Problem Statement

Design a thread-safe HashMap from scratch that supports concurrent reads and writes with fine-grained locking — similar to Java's ConcurrentHashMap with segment/bucket-level locking.

## Requirements

### Functional Requirements
- \`put(key, value)\` — insert or update a key-value pair
- \`get(key)\` → value or null if not found
- \`delete(key)\` — remove a key
- \`containsKey(key)\` — boolean
- \`size()\` — approximate count of entries
- \`keys()\` — snapshot of all current keys
- Thread-safe: multiple readers and writers operating concurrently without data corruption
- Load factor and rehashing: when entries exceed threshold, rehash to double capacity
- Handle hash collisions via chaining (linked list) or open addressing

### Non-Functional Requirements
- Fine-grained locking: lock per bucket (not global lock)
- Reads can be concurrent (ReadWriteLock per bucket)
- High throughput for read-heavy workloads

## Key Entities
- **Entry<K, V>**: key, value, next (for chaining)
- **Bucket**: list of entries + ReentrantReadWriteLock
- **ConcurrentHashMap<K, V>**: array of Buckets, capacity, loadFactor
  - \`getBucketIndex(key)\`: hash(key) % capacity
  - \`put\`, \`get\`, \`delete\` with bucket-level locking
  - \`rehash()\`: doubles capacity, redistributes all entries (global write lock during rehash)

## Constraints
- Default capacity: 16 buckets
- Load factor: 0.75 — rehash when (size / capacity) > loadFactor
- Bucket-level ReadWriteLock: multiple concurrent reads per bucket allowed
- Rehashing requires global write lock to prevent corrupt state during resize`,
    constraints: `- Default capacity 16, load factor 0.75
- Per-bucket ReentrantReadWriteLock: concurrent reads allowed; writes are exclusive per bucket
- Rehashing requires global write lock (briefly blocks all operations)
- Collision handling via chaining (linked list per bucket)
- size() is an approximate count (eventual consistency under concurrent writes)`,
    hints: [
      "Array of Bucket objects \u2014 each Bucket has a LinkedList<Entry> and a ReentrantReadWriteLock.",
    "get(): acquire read lock on bucket \u2192 traverse chain for key \u2192 release lock. Never holds multiple bucket locks.",
    "put(): acquire write lock on bucket \u2192 insert/update entry \u2192 increment size counter (AtomicInteger) \u2192 release \u2192 check load factor.",
    "Rehash: acquire write locks on ALL buckets (in order to avoid deadlock) \u2192 create new array \u2192 reinsert all entries \u2192 release.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Concurrent HashMap (Thread-Safe HashMap)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAConcurrentHasSystem system = new DesignAConcurrentHasSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAConcurrentHasSystem {
    public DesignAConcurrentHasSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Concurrent HashMap (Thread-Safe HashMap)

class DesignAConcurrentHasSystem {
public:
    DesignAConcurrentHasSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAConcurrentHasSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Concurrent HashMap (Thread-Safe HashMap)

class DesignAConcurrentHasSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAConcurrentHasSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-concurrent-hashmap-tc1",
        description: "Test case 1",
        input: "100 concurrent threads: 90 readers calling get(), 10 writers calling put(). Map has 50 pre-populated entries.",
        expectedOutput: "All 90 readers complete without blocking each other. 10 writers acquire exclusive bucket locks. No data corruption or deadlock.",
        isHidden: false,
      },
      {
        id: "design-concurrent-hashmap-tc2",
        description: "Test case 2",
        input: "Insert 13 entries into capacity-16 map (load = 0.81 > 0.75). Trigger rehash.",
        expectedOutput: "Rehash triggered: capacity doubles to 32. All 13 entries redistributed to new buckets. Subsequent operations use new layout.",
        isHidden: true,
      },
    ],
  },
  {
    id: "45",
    slug: "design-ride-pooling",
    title: "Design a Ride-Pooling System (OLA Share)",
    difficulty: "Hard",
    category: "Real World Systems",
    tags: ["Route Optimization", "Matching", "Geolocation", "Carpooling", "Real-Time"],
    order: 45,
    description: `## Problem Statement

Design a ride-pooling system (like Ola Share or Uber Pool) where multiple passengers with similar routes share a single cab — reducing individual fares while maximizing driver utilization.

## Requirements

### Functional Requirements
- Passenger requests a pool ride: pickup, drop-off, max wait time
- System attempts to match with an existing pool ride going in a compatible direction
- If no match: create a new pool ride for that passenger
- Pool ride capacity: max 2–3 passengers per vehicle
- Fare: individually calculated based on each passenger's distance segment
- Driver picks up and drops off passengers in optimized route order
- Passenger can set maximum detour tolerance (e.g., route cannot increase by more than 20%)
- If all pool attempts fail within max wait time: auto-upgrade to solo ride
- Rating system for pool co-passengers (optional)

### Non-Functional Requirements
- Thread-safe pool matching
- Singleton PoolingService

## Key Entities
- **PoolRequest**: id, passenger, pickup, dropoff, maxWaitTime, maxDetour, status
- **PoolRide**: id, driver, passengerRequests, currentRoute, status, vehicle
- **RouteSegment**: start, end, distance
- **MatchingEngine**: \`findCompatiblePool(PoolRequest)\` → PoolRide or null
- **PoolingService**: Singleton

## Constraints
- Max 3 passengers per pool ride
- Detour tolerance: new passenger's addition cannot increase any existing passenger's travel time by > maxDetour%
- Pool matching window: 5 minutes; if no match, create new pool or upgrade to solo
- Thread-safe matching — concurrent pool requests must not overbook a ride`,
    constraints: `- Max 3 passengers per pool vehicle
- Detour check: adding new passenger must not increase existing passenger ETA by > maxDetour%
- Pool matching window: 5 minutes maximum
- Thread-safe: concurrent requests cannot assign same pool ride to >3 passengers
- Auto-upgrade to solo ride if no pool match within window`,
    hints: [
      "Compatibility check: new passenger's pickup and drop-off must lie along (or close to) the existing pool ride's route.",
    "Detour calculation: compute new route through existing stops + new passenger's stops; compare against original route time.",
    "Route optimization: given N stops, find the order that minimizes total travel time \u2014 for N\u22644 this is feasible by brute force.",
    "Locking: synchronize on the PoolRide object when adding a new passenger to prevent concurrent over-assignment.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Ride-Pooling System (OLA Share)
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignARidepoolingSySystem system = new DesignARidepoolingSySystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignARidepoolingSySystem {
    public DesignARidepoolingSySystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Ride-Pooling System (OLA Share)

class DesignARidepoolingSySystem {
public:
    DesignARidepoolingSySystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignARidepoolingSySystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Ride-Pooling System (OLA Share)

class DesignARidepoolingSySystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignARidepoolingSySystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-ride-pooling-tc1",
        description: "Test case 1",
        input: "Passenger A rides Downtown\u2192Airport. Passenger B requests Downtown\u2192Airport 2 min later. Both within detour tolerance.",
        expectedOutput: "B matched to A's pool ride. Fare for each reduced by 30%. Seat count: 2/3 occupied.",
        isHidden: false,
      },
      {
        id: "design-ride-pooling-tc2",
        description: "Test case 2",
        input: "Passenger C's route is completely perpendicular to existing pool ride's route. Detour would be 45% (> 20% max).",
        expectedOutput: "C not matched to existing pool ride. New pool ride created for C. Waits up to 5 min for another match.",
        isHidden: true,
      },
    ],
  },
  {
    id: "46",
    slug: "design-employee-management",
    title: "Design an Employee Management System",
    difficulty: "Easy",
    category: "Real World Systems",
    tags: ["CRUD", "Hierarchy", "Payroll", "Reporting", "OOP"],
    order: 46,
    description: `## Problem Statement

Design an employee management system for an organization — handling employee records, org hierarchy, department management, payroll calculations, and reporting.

## Requirements

### Functional Requirements
- Employee profiles: id, name, email, department, designation, salary, joinDate, manager
- Employee types: FULL_TIME, PART_TIME, CONTRACT — different payroll rules
- Department management: create, update departments; assign employees
- Org hierarchy: each employee has a manager (except CEO); traverse up the chain
- Payroll: compute monthly salary considering type (full-time = fixed, part-time = hourly × hours, contract = daily rate × days)
- Leave management: employees request leaves; manager approves/rejects; track leave balance
- Reports: employee count per department, average salary per department, list by designation
- Search employees by name, department, designation

### Non-Functional Requirements
- CRUD operations on employees and departments
- Singleton EmployeeService

## Key Entities
- **Employee**: id, name, email, department, designation, employmentType, salary, managerId, joinDate
- **Department**: id, name, head, employees
- **LeaveRequest**: id, employee, type (SICK/CASUAL/ANNUAL), startDate, endDate, status
- **PayrollRecord**: employeeId, month, grossAmount, deductions, netAmount
- **EmployeeService**: Singleton

## Constraints
- Each employee has exactly one manager (except the top-level executive)
- No circular management relationships
- Leave balance: ANNUAL = 15 days/year, SICK = 12 days/year, CASUAL = 6 days/year
- Payroll computed at month-end for all employees`,
    constraints: `- No circular manager relationships (DAG hierarchy)
- Leave balance tracked annually and deducted on approval
- Part-time payroll requires hours worked input; contract requires days worked
- Department head must be an existing employee
- Employee cannot be their own manager`,
    hints: [
      "Use Composite Pattern for org hierarchy \u2014 Employee has a reference to their Manager (also an Employee).",
    "Strategy Pattern for payroll: FullTimePayroll, PartTimePayroll, ContractPayroll each implement `calculateSalary(Employee, month)`.",
    "Leave balance check before approval: deduct only when status changes from PENDING \u2192 APPROVED.",
    "Search: maintain auxiliary maps (name\u2192employees, department\u2192employees) for O(1) lookups.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design an Employee Management System
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAnEmployeeManaSystem system = new DesignAnEmployeeManaSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAnEmployeeManaSystem {
    public DesignAnEmployeeManaSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design an Employee Management System

class DesignAnEmployeeManaSystem {
public:
    DesignAnEmployeeManaSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAnEmployeeManaSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design an Employee Management System

class DesignAnEmployeeManaSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAnEmployeeManaSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-employee-management-tc1",
        description: "Test case 1",
        input: "Part-time employee worked 80 hours in December. Hourly rate = \u20b9200/hour. Compute payroll.",
        expectedOutput: "Gross = 80 \u00d7 \u20b9200 = \u20b916,000. After standard deductions (assume 10%): Net = \u20b914,400. PayrollRecord created.",
        isHidden: false,
      },
      {
        id: "design-employee-management-tc2",
        description: "Test case 2",
        input: "Employee E1 requests 5 days annual leave. Annual leave balance = 3 days remaining.",
        expectedOutput: "Leave request rejected: insufficient annual leave balance (3 days available, 5 requested).",
        isHidden: true,
      },
    ],
  },
  {
    id: "47",
    slug: "design-bounded-blocking-queue",
    title: "Design a Thread-Safe Bounded Blocking Queue",
    difficulty: "Medium",
    category: "Concurrency",
    tags: ["Producer-Consumer", "Blocking Queue", "Semaphore", "Condition Variables", "Concurrency"],
    order: 47,
    description: `## Problem Statement

Design a thread-safe bounded blocking queue that supports the classic producer-consumer pattern — producers block when queue is full and consumers block when queue is empty, with configurable capacity.

## Requirements

### Functional Requirements
- \`enqueue(item)\` — add item; blocks if queue is full until space is available
- \`dequeue()\` → item; blocks if queue is empty until an item is available
- \`offer(item, timeout)\` → boolean; tries to enqueue within timeout, returns false if still full
- \`poll(timeout)\` → item or null; tries to dequeue within timeout
- \`size()\` → current number of elements
- \`isEmpty()\`, \`isFull()\` → boolean checks
- \`peek()\` → view head without removing
- Supports N concurrent producers and M concurrent consumers safely

### Non-Functional Requirements
- Implemented using \`ReentrantLock + Condition\` (notFull, notEmpty)
- Alternatively demonstrate with \`Semaphore\` implementation
- No busy-waiting
- Fixed capacity set at construction time

## Key Entities
- **BoundedBlockingQueue<T>**: capacity, items (array/LinkedList), lock (ReentrantLock), notFull (Condition), notEmpty (Condition), count
  - \`enqueue\`: lock → while(full) await(notFull) → add → signal(notEmpty) → unlock
  - \`dequeue\`: lock → while(empty) await(notEmpty) → remove → signal(notFull) → unlock

## Constraints
- Capacity >= 1
- No busy-waiting — use condition variables
- Deadlock-free: always release lock in finally block
- FIFO ordering: first enqueued item is first dequeued`,
    constraints: `- Capacity fixed at construction time, minimum 1
- No busy-waiting — blocking implemented via Condition.await()
- FIFO ordering guaranteed
- Lock released in finally block — deadlock prevention
- Spurious wake-up handled with while loop (not if)`,
    hints: [
      "Use ReentrantLock + two Conditions: `notFull` (signal when item removed) and `notEmpty` (signal when item added).",
    "enqueue pattern: `lock.lock(); try { while(count == capacity) notFull.await(); items[tail] = item; notEmpty.signal(); } finally { lock.unlock(); }`",
    "Always use `while` (not `if`) for condition checks to handle spurious wakeups.",
    "Alternative: Semaphore-based \u2014 `emptySlots = new Semaphore(capacity); fullSlots = new Semaphore(0)`; enqueue acquires emptySlots, dequeue acquires fullSlots.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Thread-Safe Bounded Blocking Queue
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAThreadsafeBouSystem system = new DesignAThreadsafeBouSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAThreadsafeBouSystem {
    public DesignAThreadsafeBouSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Thread-Safe Bounded Blocking Queue

class DesignAThreadsafeBouSystem {
public:
    DesignAThreadsafeBouSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAThreadsafeBouSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Thread-Safe Bounded Blocking Queue

class DesignAThreadsafeBouSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAThreadsafeBouSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-bounded-blocking-queue-tc1",
        description: "Test case 1",
        input: "Queue capacity=2. Producer P1 enqueues A, B. Producer P2 tries to enqueue C (queue full). Consumer dequeues A.",
        expectedOutput: "A and B enqueued. P2 blocks on full queue. After consumer dequeues A, P2 unblocks and C is enqueued.",
        isHidden: false,
      },
      {
        id: "design-bounded-blocking-queue-tc2",
        description: "Test case 2",
        input: "Empty queue. Consumer C1 calls dequeue(). Producer P1 enqueues 'hello' 2 seconds later.",
        expectedOutput: "C1 blocks on empty queue. After 2s, P1 enqueues 'hello'. C1 unblocks and returns 'hello'.",
        isHidden: true,
      },
    ],
  },
  {
    id: "48",
    slug: "design-read-write-lock",
    title: "Design a Read-Write Lock",
    difficulty: "Medium",
    category: "Concurrency",
    tags: ["Concurrency", "Locks", "Readers-Writers Problem", "Fairness", "Synchronization"],
    order: 48,
    description: `## Problem Statement

Design a custom Read-Write Lock that allows multiple concurrent readers or exactly one exclusive writer — with no starvation of writers when readers keep arriving (fair implementation).

## Requirements

### Functional Requirements
- \`readLock()\` — acquire read lock; blocks only if a writer holds or is waiting
- \`readUnlock()\` — release read lock
- \`writeLock()\` — acquire write lock; blocks until all current readers finish and no other writer holds
- \`writeUnlock()\` — release write lock
- Multiple concurrent readers allowed
- Writer gets exclusive access
- Writer fairness: once a writer is waiting, new readers do not jump ahead (no writer starvation)
- Reentrant option (bonus): same thread can acquire read lock multiple times

### Non-Functional Requirements
- Implemented using \`synchronized\` + \`wait/notify\` or \`ReentrantLock + Condition\`
- No deadlocks
- Writer preference to prevent starvation

## Key Entities
- **ReadWriteLock**: activeReaders (int), waitingWriters (int), activeWriter (boolean), lock (Object)
  - \`readLock()\`: synchronized; while(activeWriter || waitingWriters > 0) wait(); activeReaders++
  - \`readUnlock()\`: synchronized; activeReaders--; if 0, notifyAll()
  - \`writeLock()\`: synchronized; waitingWriters++; while(activeReaders > 0 || activeWriter) wait(); waitingWriters--; activeWriter=true
  - \`writeUnlock()\`: synchronized; activeWriter=false; notifyAll()

## Constraints
- No reader starvation (readers eventually get the lock when no writer is active)
- No writer starvation (writer preference: new readers wait if writers are queued)
- Deadlock-free: never wait while holding another lock
- notifyAll() used on unlock to wake all waiting threads`,
    constraints: `- Writer preference: new readers wait if any writer is waiting
- Multiple concurrent readers allowed when no writer is active or waiting
- Exactly one writer at a time; no readers while writer is active
- notifyAll() on every unlock to prevent missed signals
- No deadlocks — acquire at most one lock at a time`,
    hints: [
      "State variables: `activeReaders`, `activeWriter (boolean)`, `waitingWriters`. Condition: readers wait if `activeWriter || waitingWriters > 0`.",
    "Writer increments `waitingWriters` before waiting \u2014 this signals arriving readers to also wait (writer preference).",
    "Always use `notifyAll()` not `notify()` \u2014 prevents scenarios where a waiting writer is not notified.",
    "For reentrant read lock: store a Map<ThreadId, count> of per-thread read acquisitions.",
    ],
    starterCode: {
      java: `import java.util.*;
import java.util.concurrent.*;

// Design a Read-Write Lock
// Implement your solution below

public class Main {
    public static void main(String[] args) {
        DesignAReadwriteLockSystem system = new DesignAReadwriteLockSystem();
        System.out.println("System initialized: " + system.getClass().getSimpleName());
    }
}

class DesignAReadwriteLockSystem {
    public DesignAReadwriteLockSystem() {
        // TODO: Initialize your data structures
    }
    
    // TODO: Add your methods here
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <memory>
#include <mutex>
using namespace std;

// Design a Read-Write Lock

class DesignAReadwriteLockSystem {
public:
    DesignAReadwriteLockSystem() {
        // TODO: Initialize
    }
    // TODO: Add your methods here
};

int main() {
    DesignAReadwriteLockSystem system;
    cout << "System initialized" << endl;
    return 0;
}`,
      javascript: `// Design a Read-Write Lock

class DesignAReadwriteLockSystem {
  constructor() {
    // TODO: Initialize
  }
  // TODO: Add your methods here
}

const system = new DesignAReadwriteLockSystem();
console.log("System initialized:", system.constructor.name);`,
    },
    solution: {
      java: `// Reference solution available after submission`,
      cpp: `// Reference solution available after submission`,
      javascript: `// Reference solution available after submission`,
    },
    testCases: [
      {
        id: "design-read-write-lock-tc1",
        description: "Test case 1",
        input: "R1 and R2 both acquire readLock(). W1 calls writeLock(). R3 calls readLock().",
        expectedOutput: "R1 and R2 read concurrently. W1 waits (active readers > 0, waitingWriters=1). R3 also waits (writer is waiting). After R1 and R2 release, W1 gets write lock. After W1 releases, R3 gets read lock.",
        isHidden: false,
      },
      {
        id: "design-read-write-lock-tc2",
        description: "Test case 2",
        input: "W1 holds write lock. W2 and R1 both waiting. W1 releases.",
        expectedOutput: "notifyAll() called. W2 wins write lock (writer priority). R1 still waits. After W2 releases, R1 acquires read lock.",
        isHidden: true,
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
