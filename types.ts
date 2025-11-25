
export type ZoneType = 'HIGH_RISK' | 'MED_RISK' | 'GENERAL';

export interface Inspector {
  id: string;
  displayName: string; // Arabic Name
  username: string;
  passwordHash: string; // Simulation
  allowedZoneTypes: ZoneType[];
  isActive: boolean;
}

export interface Zone {
  id: string;
  name: string; // Arabic
  type_code: ZoneType;
}

export interface ChecklistItem {
  id: string;
  number: number;
  name: string; // Arabic
  name_en?: string; // English
  max_score: number;
  area_type: ZoneType;
  isActive: boolean;
  possible_observations?: string[];
}

export interface AppConfig {
  inspectors: Inspector[];
  zones: Zone[];
  checklists: ChecklistItem[];
}

export interface InspectionRecord {
  id: string;
  inspectorName: string;
  zoneName: string;
  zoneType: string;
  timestamp: number;
  scores: Record<string, number>;
  notes: Record<string, string>;
  selectedObservations?: Record<string, string[]>;
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
}
