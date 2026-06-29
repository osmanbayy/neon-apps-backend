import { Email } from '../value-objects/email.vo';

interface CreateUserProps {
  name: string;
  email: Email;
  password: string;
}

interface RestoreUserProps {
  id: number;
  name: string;
  email: Email;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class User {
  constructor(
    private readonly id: number | null,
    private name: string,
    private email: Email,
    private password: string,
    private readonly createdAt: Date | null,
    private updatedAt: Date | null,
    private deletedAt: Date | null,
  ) {}

  static create(props: CreateUserProps): User {
    const name = props.name.trim();
    if (!name) throw new Error('Name cannot be empty.');

    return new User(null, name, props.email, props.password, null, null, null);
  }

  static restore(props: RestoreUserProps): User {
    return new User(
      props.id,
      props.name,
      props.email,
      props.password,
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
    );
  }

  changeName(name: string): void {
    const normalizedName = name.trim();
    if (!normalizedName) throw new Error('Name cannot be empty.');

    this.name = normalizedName;
    this.updatedAt = new Date();
  }

  changeEmail(email: Email): void {
    this.email = email;
    this.updatedAt = new Date();
  }

  softDelete(): void {
    if (this.deletedAt) throw new Error('User already deleted.');
    this.deletedAt = new Date();
  }

  restore(): void {
    this.deletedAt = null;
    this.updatedAt = new Date();
  }

  getId(): number | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date | null {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  getDeletedAt(): Date | null {
    return this.deletedAt;
  }
}
