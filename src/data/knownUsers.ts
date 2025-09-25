export interface KnownUser {
  user_name: string;
  upi_number: string;
  upi_ids: string[];
  score: number;
  msg: string;
}

export const knownUsers: KnownUser[] = [
  {
    "user_name": "Ramesh Kumar",
    "upi_number": "9876543210",
    "upi_ids": [
      "ramesh@ybl",
      "ramesh@upi",
      "ramesh123@okicici",
      "rameshkumar@okaxis",
      "rkumar@paytm"
    ],
    "score": 92,
    "msg": "Safe – Trusted user, no major reports"
  },
  {
    "user_name": "Priya Sharma",
    "upi_number": "9988776655",
    "upi_ids": [
      "priya@upi",
      "priyasharma@okhdfcbank",
      "priya@paytm",
      "p.sharma@ybl",
      "priyaji@okaxis"
    ],
    "score": 76,
    "msg": "Suspicious – Few reports, proceed with caution"
  },
  {
    "user_name": "Arjun Mehta",
    "upi_number": "9123456789",
    "upi_ids": [
      "arjun@upi",
      "mehtaarjun@okicici",
      "arjunm@paytm",
      "arjun@ybl",
      "arjun@oksbi"
    ],
    "score": 58,
    "msg": "Medium Risk – Multiple scam reports, double-check before sending"
  },
  {
    "user_name": "Sneha Reddy",
    "upi_number": "9011223344",
    "upi_ids": [
      "sneha@upi",
      "snehareddy@okhdfcbank",
      "sneha@ybl",
      "sneha@paytm",
      "sreddy@okaxis"
    ],
    "score": 39,
    "msg": "High Risk – Many scam reports, avoid transaction"
  },
  {
    "user_name": "Vikram Singh",
    "upi_number": "9090909090",
    "upi_ids": [
      "vikram@upi",
      "vksingh@okicici",
      "vikram@paytm",
      "singhvikram@ybl",
      "vikram@okaxis"
    ],
    "score": 20,
    "msg": "Fraudulent – Reported multiple times, BLOCKED"
  },
  {
    "user_name": "Omkar",
    "upi_number": "9620174461",
    "upi_ids": [
      "omkar@upi",
      "9620174461@ybl"
    ],
    "score": 40,
    "msg": "High Risk – This user has been reported for suspicious activity."
  }
];
