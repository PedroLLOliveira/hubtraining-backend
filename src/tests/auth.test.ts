import { UserService } from '../services/UserService';
import { JwtService } from '../utils/auth/jwt.service';
import { authBusiness } from '../business/AuthBusiness';
import { HashService } from '../utils/auth/hash.service';

// Mocking as dependências
jest.mock('../services/UserService');
jest.mock('../utils/auth/jwt.service');
jest.mock('../utils/auth/hash.service');

describe('AuthBusiness', () => {
    let AuthBusiness: typeof authBusiness;

    beforeEach(() => {
        AuthBusiness = authBusiness;
    });

    it('should register a new user', async () => {
        // Mockar o comportamento do HashService e UserService
        const mockHashPassword = jest.fn().mockResolvedValue('hashed-password');
        HashService.hashPassword = mockHashPassword;

        const mockCreateUser = jest.fn().mockResolvedValue({
            id: 'mocked-uuid',
            name: 'Pedro',
            email: 'pedro@example.com',
            password_hash: 'hashed-password',
            role: 'student',
        });

        UserService.createUser = mockCreateUser;

        const userData = {
            name: 'Pedro',
            email: 'pedro@example.com',
            password: 'senha123',
            role: 'student',
        };

        // Simula a criação de usuário
        const user = await authBusiness.register(userData);

        // Asserts para garantir que a função foi chamada corretamente
        expect(mockCreateUser).toHaveBeenCalledWith({
            name: 'Pedro',
            email: 'pedro@example.com',
            password_hash: 'hashed-password',
            role: 'student',
        });
        expect(user).toHaveProperty('email', 'pedro@example.com');
    });

    it('should login the user and return a token', async () => {
        // Mockar o comportamento do UserService e HashService
        const mockFindUserByEmail = jest.fn().mockResolvedValue({
            dataValues: {
                id: 'mocked-uuid',
                email: 'pedro@example.com',
                password_hash: 'hashed-password',
                role: 'student',
            },
        });

        const mockComparePassword = jest.fn().mockResolvedValue(true);
        const mockSignToken = jest.fn().mockResolvedValue('mocked-token');

        // Atribuindo os mocks
        UserService.findUserByEmail = mockFindUserByEmail;
        HashService.comparePassword = mockComparePassword;
        JwtService.getInstance = jest.fn().mockReturnValue({
            sign: mockSignToken,
        });

        const email = 'pedro@example.com';
        const password = 'senha123';

        const result = await authBusiness.login(email, password);

        expect(mockFindUserByEmail).toHaveBeenCalledWith(email);
        expect(mockComparePassword).toHaveBeenCalledWith(password, 'hashed-password');
        expect(mockSignToken).toHaveBeenCalledWith({ userId: 'mocked-uuid' });

        // Asserts para o token gerado
        expect(result).toEqual({ token: 'mocked-token' });
    });

    it('should throw an error if UserService.createUser fails', async () => {
        const mockHashPassword = jest.fn().mockResolvedValue('hashed-password');
        HashService.hashPassword = mockHashPassword;

        const mockCreateUser = jest.fn().mockRejectedValue(new Error('Database error'));
        UserService.createUser = mockCreateUser;

        const userData = {
            name: 'Pedro',
            email: 'pedro@example.com',
            password: 'senha123',
            role: 'student',
        };

        await expect(authBusiness.register(userData)).rejects.toThrow('Database error');
    });

    it('should throw an error if HashService.hashPassword fails', async () => {
        const mockHashPassword = jest.fn().mockRejectedValue(new Error('Hashing error'));
        HashService.hashPassword = mockHashPassword;

        const userData = {
            name: 'Pedro',
            email: 'pedro@example.com',
            password: 'senha123',
            role: 'student',
        };

        await expect(authBusiness.register(userData)).rejects.toThrow('Hashing error');
    });

    it('should throw an error if user is not found', async () => {
        const mockFindUserByEmail = jest.fn().mockResolvedValue(null);
        UserService.findUserByEmail = mockFindUserByEmail;

        await expect(authBusiness.login('pedro@example.com', 'senha123')).rejects.toThrow('User not found');
    });

    it('should throw an error if password_hash is not found', async () => {
        const mockFindUserByEmail = jest.fn().mockResolvedValue({
            dataValues: {
                id: 'mocked-uuid',
                email: 'pedro@example.com',
                role: 'student',
            },
        });
        UserService.findUserByEmail = mockFindUserByEmail;

        await expect(authBusiness.login('pedro@example.com', 'senha123')).rejects.toThrow('Password hash not found');
    });

    it('should throw an error if credentials are invalid', async () => {
        const mockFindUserByEmail = jest.fn().mockResolvedValue({
            dataValues: {
                id: 'mocked-uuid',
                email: 'pedro@example.com',
                password_hash: 'hashed-password',
                role: 'student',
            },
        });
        UserService.findUserByEmail = mockFindUserByEmail;

        const mockComparePassword = jest.fn().mockResolvedValue(false);
        HashService.comparePassword = mockComparePassword;

        await expect(authBusiness.login('pedro@example.com', 'senha123')).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error if JwtService.sign fails', async () => {
        const mockFindUserByEmail = jest.fn().mockResolvedValue({
            dataValues: {
                id: 'mocked-uuid',
                email: 'pedro@example.com',
                password_hash: 'hashed-password',
                role: 'student',
            },
        });
        UserService.findUserByEmail = mockFindUserByEmail;

        const mockComparePassword = jest.fn().mockResolvedValue(true);
        HashService.comparePassword = mockComparePassword;

        const mockSignToken = jest.fn().mockRejectedValue(new Error('Token generation error'));
        JwtService.getInstance = jest.fn().mockReturnValue({
            sign: mockSignToken,
        });

        await expect(authBusiness.login('pedro@example.com', 'senha123')).rejects.toThrow('Token generation error');
    });
});