// Shared clinic data service that will be used by both /clinic and /clinic_old systems
// This ensures data consistency between the two management interfaces

export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  nextAppointment: string | null;
  treatment: string;
  status: "active" | "in_treatment" | "completed" | "urgent";
  priority: "normal" | "high";
  totalVisits: number;
  totalSpent: number;
  notes: string;
  medicalHistory: string[];
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  treatment: string;
  doctorId: string;
  doctorName: string;
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled";
  notes?: string;
  reminder?: boolean;
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: string;
  status: "active" | "inactive";
  requiresEquipment?: string[];
}

export interface Staff {
  id: string;
  name: string;
  role: "doctor" | "nurse" | "assistant" | "receptionist" | "manager";
  phone: string;
  email: string;
  specialization?: string;
  schedule?: {
    [key: string]: { start: string; end: string };
  };
  status: "active" | "on_leave" | "inactive";
  permissions: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "medicine" | "equipment" | "supplies";
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  price: number;
  supplier?: string;
  expiryDate?: string;
  status: "in_stock" | "low_stock" | "out_of_stock" | "expired";
}

export interface FinancialRecord {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
  relatedTo?: {
    type: "patient" | "supplier" | "staff";
    id: string;
    name: string;
  };
  paymentMethod: "cash" | "card" | "transfer" | "insurance";
  status: "pending" | "completed" | "cancelled";
}

export interface Laboratory {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  specialties: string[];
  workingHours: string;
  isActive: boolean;
  averageDeliveryTime: number; // days
  qualityRating: number; // 1-5
  priceRange: "low" | "medium" | "high";
}

export interface LabOrder {
  id: string;
  patientId: string;
  patientName: string;
  laboratoryId: string;
  laboratoryName: string;
  treatmentPlanId?: string;
  orderType:
    | "prosthetics"
    | "crown"
    | "bridge"
    | "implant"
    | "orthodontics"
    | "other";
  description: string;
  specifications: {
    material?: string;
    color?: string;
    size?: string;
    quantity?: number;
    specialInstructions?: string;
  };
  status:
    | "ordered"
    | "in_progress"
    | "ready"
    | "delivered"
    | "installed"
    | "cancelled";
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  cost: number;
  isPaid: boolean;
  paymentStatus: "pending" | "partial" | "paid";
  doctorNotes?: string;
  labNotes?: string;
  photos?: string[];
  priority: "normal" | "urgent";
  followUpRequired: boolean;
  installationAppointmentId?: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  title: string;
  description: string;
  phases: Array<{
    id: string;
    title: string;
    description: string;
    estimatedDuration: number; // days
    cost: number;
    status: "pending" | "in_progress" | "completed" | "cancelled";
    requiresLab: boolean;
    labOrderId?: string;
    appointments: string[]; // appointment IDs
  }>;
  totalCost: number;
  estimatedDuration: number; // total days
  status: "draft" | "approved" | "in_progress" | "completed" | "cancelled";
  createdDate: string;
  approvedDate?: string;
  completedDate?: string;
  notes?: string;
}

export interface ClinicStats {
  todayAppointments: number;
  pendingAppointments: number;
  completedToday: number;
  totalPatients: number;
  monthlyRevenue: number;
  activeStaff: number;
  lowStock: number;
  upcomingReminders: number;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  // Lab statistics
  pendingLabOrders: number;
  readyLabOrders: number;
  overdueLabOrders: number;
  thisMonthLabCosts: number;
}

// Mock data that will be shared between both systems
class SharedClinicDataService {
  // In a real implementation, this would connect to a database/API
  private static instance: SharedClinicDataService;

  private patients: Patient[] = [
    {
      id: "1",
      name: "أحمد محمد الطائي",
      age: 28,
      phone: "+964 770 123 4567",
      email: "ahmed.taie@email.com",
      address: "الكرادة، بغداد",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-22",
      treatment: "تنظيف الأسنان",
      status: "active",
      priority: "normal",
      totalVisits: 8,
      totalSpent: 750000,
      notes: "مريض منتظم، لا يوجد حساسية معروفة",
      medicalHistory: ["تسوس أسنان", "التهاب لثة خفيف"],
    },
    {
      id: "2",
      name: "فاطمة علي السعد",
      age: 35,
      phone: "+964 750 987 6543",
      email: "fatima.saad@email.com",
      address: "المنصور، بغداد",
      lastVisit: "2024-01-14",
      nextAppointment: "2024-01-20",
      treatment: "حشوة ضرس",
      status: "in_treatment",
      priority: "high",
      totalVisits: 12,
      totalSpent: 1250000,
      notes: "تحتاج متابعة دورية، حساسية من البنسلين",
      medicalHistory: ["تسوس متقدم", "حشوات سابقة", "تقويم أسنان"],
    },
  ];

  private appointments: Appointment[] = [
    {
      id: "1",
      patientId: "1",
      patientName: "أحمد محمد الطائي",
      date: "2024-01-22",
      time: "10:00",
      duration: 60,
      treatment: "تنظيف الأسنان",
      doctorId: "doc1",
      doctorName: "د. سارة أحمد",
      status: "scheduled",
      reminder: true,
    },
  ];

  private treatments: Treatment[] = [
    {
      id: "1",
      name: "تنظيف الأسنان",
      description: "تنظيف شامل للأسنان وإزالة الجير",
      duration: 45,
      price: 50000,
      category: "وقائي",
      status: "active",
    },
    {
      id: "2",
      name: "حشوة أسنان",
      description: "حشوة بيضاء للأسنان",
      duration: 60,
      price: 75000,
      category: "علاجي",
      status: "active",
    },
  ];

  private staff: Staff[] = [
    {
      id: "doc1",
      name: "د. سارة أحمد",
      role: "doctor",
      phone: "+964 770 111 2222",
      email: "dr.sara@clinic.com",
      specialization: "طب الأسنان العام",
      status: "active",
      permissions: ["view_patients", "edit_patients", "manage_appointments"],
    },
  ];

  private inventory: InventoryItem[] = [
    {
      id: "1",
      name: "مخدر موضعي",
      category: "medicine",
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      unit: "علبة",
      price: 15000,
      status: "low_stock",
    },
  ];

  private financialRecords: FinancialRecord[] = [
    {
      id: "1",
      type: "income",
      amount: 50000,
      description: "تنظيف أسنان",
      category: "خدمات طبية",
      date: "2024-01-15",
      relatedTo: {
        type: "patient",
        id: "1",
        name: "أحمد محمد الطائي",
      },
      paymentMethod: "cash",
      status: "completed",
    },
  ];

  private laboratories: Laboratory[] = [
    {
      id: "lab1",
      name: "مختبر الدقة لطب الأسنان",
      address: "شارع الجادرية، بغداد",
      phone: "+964 770 111 3333",
      email: "info@precision-lab.com",
      specialties: [
        "تركيبات سيراميك",
        "أطقم أسنان",
        "تيجان زيركونيا",
        "تقويم الأسنان",
      ],
      workingHours: "8:00 ص - 6:00 م",
      isActive: true,
      averageDeliveryTime: 5,
      qualityRating: 4.8,
      priceRange: "medium",
    },
    {
      id: "lab2",
      name: "مختبر التميز الذهبي",
      address: "شارع الكرادة، بغداد",
      phone: "+964 750 222 4444",
      email: "orders@golden-excellence.com",
      specialties: ["تركيبات ذهبية", "تيجان بورسلين", "جسور ثابتة"],
      workingHours: "9:00 ص - 7:00 م",
      isActive: true,
      averageDeliveryTime: 7,
      qualityRating: 4.9,
      priceRange: "high",
    },
  ];

  private labOrders: LabOrder[] = [
    {
      id: "order1",
      patientId: "1",
      patientName: "أحمد محمد الطائي",
      laboratoryId: "lab1",
      laboratoryName: "مختبر الدقة لطب الأسنان",
      treatmentPlanId: "plan1",
      orderType: "crown",
      description: "تاج سيراميك للضرس العلوي الأيمن",
      specifications: {
        material: "سيراميك زيركونيا",
        color: "A2",
        quantity: 1,
        specialInstructions: "مطابقة اللون مع الأسنان الطبيعية",
      },
      status: "in_progress",
      orderDate: "2024-01-18",
      expectedDeliveryDate: "2024-01-23",
      cost: 200000,
      isPaid: false,
      paymentStatus: "pending",
      priority: "normal",
      followUpRequired: true,
    },
    {
      id: "order2",
      patientId: "2",
      patientName: "فاطمة علي السعد",
      laboratoryId: "lab2",
      laboratoryName: "مختبر التميز الذهبي",
      orderType: "prosthetics",
      description: "طقم أسنان علوي جزئي",
      specifications: {
        material: "أكريليك مقوى",
        color: "طبيعي",
        quantity: 1,
      },
      status: "ready",
      orderDate: "2024-01-12",
      expectedDeliveryDate: "2024-01-19",
      actualDeliveryDate: "2024-01-19",
      cost: 350000,
      isPaid: true,
      paymentStatus: "paid",
      priority: "normal",
      followUpRequired: true,
    },
  ];

  private treatmentPlans: TreatmentPlan[] = [
    {
      id: "plan1",
      patientId: "1",
      patientName: "أحمد محمد الطائي",
      doctorId: "doc1",
      doctorName: "د. سارة أحمد",
      title: "خطة علاج شاملة للأسنان الخلفية",
      description: "علاج تسوس متقدم وتركيب تاج للضرس العلوي",
      phases: [
        {
          id: "phase1",
          title: "علاج العصب",
          description: "علاج عصب الضرس العلوي الأيمن",
          estimatedDuration: 7,
          cost: 120000,
          status: "completed",
          requiresLab: false,
          appointments: ["1"],
        },
        {
          id: "phase2",
          title: "تحضير وتركيب التاج",
          description: "تحضير السن وأخذ طبعة وتركيب تاج زيركونيا",
          estimatedDuration: 14,
          cost: 200000,
          status: "in_progress",
          requiresLab: true,
          labOrderId: "order1",
          appointments: ["2"],
        },
      ],
      totalCost: 320000,
      estimatedDuration: 21,
      status: "in_progress",
      createdDate: "2024-01-15",
      approvedDate: "2024-01-15",
    },
  ];

  static getInstance(): SharedClinicDataService {
    if (!SharedClinicDataService.instance) {
      SharedClinicDataService.instance = new SharedClinicDataService();
    }
    return SharedClinicDataService.instance;
  }

  // Patient management methods
  async getPatients(): Promise<Patient[]> {
    return this.patients;
  }

  async getPatient(id: string): Promise<Patient | null> {
    return this.patients.find((p) => p.id === id) || null;
  }

  async addPatient(patient: Omit<Patient, "id">): Promise<Patient> {
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  async updatePatient(
    id: string,
    updates: Partial<Patient>,
  ): Promise<Patient | null> {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index >= 0) {
      this.patients[index] = { ...this.patients[index], ...updates };
      return this.patients[index];
    }
    return null;
  }

  // Appointment management methods
  async getAppointments(): Promise<Appointment[]> {
    return this.appointments;
  }

  async addAppointment(
    appointment: Omit<Appointment, "id">,
  ): Promise<Appointment> {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  // Treatment management methods
  async getTreatments(): Promise<Treatment[]> {
    return this.treatments;
  }

  // Staff management methods
  async getStaff(): Promise<Staff[]> {
    return this.staff;
  }

  // Inventory management methods
  async getInventory(): Promise<InventoryItem[]> {
    return this.inventory;
  }

  // Financial management methods
  async getFinancialRecords(): Promise<FinancialRecord[]> {
    return this.financialRecords;
  }

  // Laboratory management methods
  async getLaboratories(): Promise<Laboratory[]> {
    return this.laboratories;
  }

  async addLaboratory(lab: Omit<Laboratory, "id">): Promise<Laboratory> {
    const newLab: Laboratory = {
      ...lab,
      id: Date.now().toString(),
    };
    this.laboratories.push(newLab);
    return newLab;
  }

  async getLabOrders(): Promise<LabOrder[]> {
    return this.labOrders;
  }

  async getLabOrder(id: string): Promise<LabOrder | null> {
    return this.labOrders.find((order) => order.id === id) || null;
  }

  async addLabOrder(order: Omit<LabOrder, "id">): Promise<LabOrder> {
    const newOrder: LabOrder = {
      ...order,
      id: Date.now().toString(),
    };
    this.labOrders.push(newOrder);

    // Add lab cost to financial records
    const labExpense: FinancialRecord = {
      id: (Date.now() + 1).toString(),
      type: "expense",
      amount: order.cost,
      description: `طلب مختبر: ${order.description}`,
      category: "مختبر",
      date: order.orderDate,
      relatedTo: {
        type: "patient",
        id: order.patientId,
        name: order.patientName,
      },
      paymentMethod: "transfer",
      status: order.isPaid ? "completed" : "pending",
    };
    this.financialRecords.push(labExpense);

    return newOrder;
  }

  async updateLabOrder(
    id: string,
    updates: Partial<LabOrder>,
  ): Promise<LabOrder | null> {
    const index = this.labOrders.findIndex((order) => order.id === id);
    if (index >= 0) {
      this.labOrders[index] = { ...this.labOrders[index], ...updates };
      return this.labOrders[index];
    }
    return null;
  }

  // Treatment Plans management methods
  async getTreatmentPlans(): Promise<TreatmentPlan[]> {
    return this.treatmentPlans;
  }

  async getTreatmentPlan(id: string): Promise<TreatmentPlan | null> {
    return this.treatmentPlans.find((plan) => plan.id === id) || null;
  }

  async addTreatmentPlan(
    plan: Omit<TreatmentPlan, "id">,
  ): Promise<TreatmentPlan> {
    const newPlan: TreatmentPlan = {
      ...plan,
      id: Date.now().toString(),
    };
    this.treatmentPlans.push(newPlan);
    return newPlan;
  }

  async updateTreatmentPlan(
    id: string,
    updates: Partial<TreatmentPlan>,
  ): Promise<TreatmentPlan | null> {
    const index = this.treatmentPlans.findIndex((plan) => plan.id === id);
    if (index >= 0) {
      this.treatmentPlans[index] = {
        ...this.treatmentPlans[index],
        ...updates,
      };
      return this.treatmentPlans[index];
    }
    return null;
  }

  async getPatientTreatmentPlans(patientId: string): Promise<TreatmentPlan[]> {
    return this.treatmentPlans.filter((plan) => plan.patientId === patientId);
  }

  async getPatientLabOrders(patientId: string): Promise<LabOrder[]> {
    return this.labOrders.filter((order) => order.patientId === patientId);
  }

  // Statistics methods
  async getClinicStats(): Promise<ClinicStats> {
    const today = new Date().toISOString().split("T")[0];
    const thisMonth = new Date().toISOString().substring(0, 7);

    const todayAppointments = this.appointments.filter(
      (a) => a.date === today,
    ).length;
    const pendingAppointments = this.appointments.filter(
      (a) => a.status === "scheduled",
    ).length;
    const completedToday = this.appointments.filter(
      (a) => a.date === today && a.status === "completed",
    ).length;
    const totalPatients = this.patients.length;

    const monthlyRevenue = this.financialRecords
      .filter((r) => r.type === "income" && r.date.startsWith(thisMonth))
      .reduce((sum, r) => sum + r.amount, 0);

    const totalRevenue = this.financialRecords
      .filter((r) => r.type === "income")
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpenses = this.financialRecords
      .filter((r) => r.type === "expense")
      .reduce((sum, r) => sum + r.amount, 0);

    const activeStaff = this.staff.filter((s) => s.status === "active").length;
    const lowStock = this.inventory.filter(
      (i) => i.status === "low_stock" || i.status === "out_of_stock",
    ).length;

    // Lab statistics
    const pendingLabOrders = this.labOrders.filter(
      (order) => order.status === "ordered" || order.status === "in_progress",
    ).length;
    const readyLabOrders = this.labOrders.filter(
      (order) => order.status === "ready",
    ).length;
    const overdueLabOrders = this.labOrders.filter((order) => {
      const expectedDate = new Date(order.expectedDeliveryDate);
      const today = new Date();
      return (
        expectedDate < today &&
        (order.status === "ordered" || order.status === "in_progress")
      );
    }).length;

    const thisMonthLabCosts = this.financialRecords
      .filter(
        (r) =>
          r.type === "expense" &&
          r.category === "مختبر" &&
          r.date.startsWith(thisMonth),
      )
      .reduce((sum, r) => sum + r.amount, 0);

    return {
      todayAppointments,
      pendingAppointments,
      completedToday,
      totalPatients,
      monthlyRevenue,
      activeStaff,
      lowStock,
      upcomingReminders: 4, // Mock data
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      pendingLabOrders,
      readyLabOrders,
      overdueLabOrders,
      thisMonthLabCosts,
    };
  }

  // Search and filter methods
  async searchPatients(query: string): Promise<Patient[]> {
    const lowerQuery = query.toLowerCase();
    return this.patients.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.phone.includes(query) ||
        p.treatment.toLowerCase().includes(lowerQuery),
    );
  }

  async getPatientsByStatus(status: Patient["status"]): Promise<Patient[]> {
    return this.patients.filter((p) => p.status === status);
  }

  // System configuration methods
  async getSystemConfig(): Promise<{ defaultClinicSystem: "new" | "old" }> {
    // This would typically be stored in a database or configuration file
    return { defaultClinicSystem: "new" };
  }

  async setSystemConfig(config: {
    defaultClinicSystem: "new" | "old";
  }): Promise<void> {
    // This would typically save to a database or configuration file
    console.log("System config updated:", config);
  }
}

export const sharedClinicData = SharedClinicDataService.getInstance();
export default SharedClinicDataService;
