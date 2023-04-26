export interface IAccount {
    number: string;
    properties: {
      id: number;
      moved_in_at: string;
      moved_out_at: string | null;
      address_line_1: string;
      address_line_2: string;
      address_line_3: string;
      town: string;
      county: string;
      postcode: string;
      electricity_meter_points: {
        mpan: string;
        profile_class: number;
        consumption_standard: number;
        meters: {
          serial_number: string;
          registers: {
            identifier: string;
            rate: string;
            is_settlement_register: boolean;
          }[];
        }[];
        agreements: {
          tariff_code: string;
          valid_from: string;
          valid_to: string | null;
        }[];
        is_export: boolean;
      }[];
      gas_meter_points: {
        mprn: string;
        consumption_standard: number;
        meters: {
          serial_number: string;
        }[];
        agreements: {
          tariff_code: string;
          valid_from: string;
          valid_to: string | null;
        }[];
      }[];
    }[];
  }