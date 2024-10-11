using LinkUp_Chat_App.Server.Data;
using LinkUp_Chat_App.Server.Data.Interfaces;
using LinkUp_Chat_App.Server.Data.Repos;
using LinkUp_Chat_App.Server.Models;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using System;
using System.Threading.Tasks;
using Xunit;

namespace LinkUp_Chat_App.UnitTests
{
    public class UserRepoTests
    {
        private readonly UserRepo _userRepo;
        private readonly UsersContext _context;

        public UserRepoTests()
        {
            // Create a new in-memory database context for testing
            var options = new DbContextOptionsBuilder<UsersContext>()
                .UseInMemoryDatabase(databaseName: "TestUserDatabase")
                .Options;

            _context = new UsersContext(options);
            _userRepo = new UserRepo(_context);
        }

        [Fact]
        public async Task CreateUserAsync_ShouldAddUser_WhenUserIsValid()
        {
            // Arrange
            var user = new User { Id = Guid.NewGuid(), Username = "TestUser", PasswordHash = "hashed_password" };

            // Act
            var result = await _userRepo.CreateUserAsync(user);

            // Assert
            Assert.True(result);
            var retrievedUser = await _userRepo.GetUserByIdAsync(user.Id);
            Assert.NotNull(retrievedUser);
            Assert.Equal(user.Username, retrievedUser.Username);
        }

        [Fact]
        public async Task CheckIfUserExistAsync_ShouldReturnTrue_WhenUserExists()
        {
            // Arrange
            var user = new User { Id = Guid.NewGuid(), Username = "ExistingUser", PasswordHash = "hashed_password" };
            await _userRepo.CreateUserAsync(user);

            // Act
            var result = await _userRepo.CheckIfUserExistAsync(user.Username);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task ValidateCredentialsAsync_ShouldReturnUser_WhenCredentialsAreValid()
        {
            // Arrange
            var user = new User { Id = Guid.NewGuid(), Username = "ValidUser", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password") };
            await _userRepo.CreateUserAsync(user);

            // Act
            var result = await _userRepo.ValidateCredentialsAsync(user.Username, "password");

            // Assert
            Assert.NotNull(result);
            Assert.Equal(user.Username, result.Username);
        }

        [Fact]
        public async Task ValidateCredentialsAsync_ShouldReturnNull_WhenCredentialsAreInvalid()
        {
            // Arrange
            var user = new User { Id = Guid.NewGuid(), Username = "User", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password") };
            await _userRepo.CreateUserAsync(user);

            // Act
            var result = await _userRepo.ValidateCredentialsAsync(user.Username, "wrong_password");

            // Assert
            Assert.Null(result);
        }
    }
}
