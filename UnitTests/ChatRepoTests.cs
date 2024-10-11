using LinkUp_Chat_App.Server.Data;
using LinkUp_Chat_App.Server.Data.Interfaces;
using LinkUp_Chat_App.Server.Data.Repos;
using LinkUp_Chat_App.Server.Models;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace LinkUp_Chat_App.UnitTests
{
    public class ChatRepoTests
    {
        private readonly ChatRepo _chatRepo;
        private readonly UsersContext _context;

        public ChatRepoTests()
        {
            // Create a new in-memory database context for testing
            var options = new DbContextOptionsBuilder<UsersContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new UsersContext(options);
            _chatRepo = new ChatRepo(_context);
        }

        [Fact]
        public async Task GetRoomByIdAsync_ShouldReturnRoom_WhenRoomExists()
        {
            // Arrange
            var roomId = Guid.NewGuid();
            _context.ChatRooms.Add(new ChatRoom { Id = roomId, Name = "Test Room" });
            await _context.SaveChangesAsync();

            // Act
            var result = await _chatRepo.GetRoomByIdAsync(roomId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(roomId, result.Id);
        }

        [Fact]
        public async Task GetRoomByIdAsync_ShouldReturnNull_WhenRoomDoesNotExist()
        {
            // Arrange
            var nonExistentRoomId = Guid.NewGuid();

            // Act
            var result = await _chatRepo.GetRoomByIdAsync(nonExistentRoomId);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetAllRoomsAsync_ShouldReturnAllRooms()
        {
            // Arrange
            _context.ChatRooms.AddRange(
                new ChatRoom { Name = "Room 1" },
                new ChatRoom { Name = "Room 2" }
            );
            await _context.SaveChangesAsync();

            // Act
            var result = await _chatRepo.GetAllRoomsAsync();

            // Assert
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task CreateRoomAsync_ShouldAddRoom_WhenRoomDoesNotExist()
        {
            // Arrange
            string roomName = "New Room";

            // Act
            await _chatRepo.CreateRoomAsync(roomName);
            var createdRoom = await _chatRepo.GetRoomByNameAsync(roomName);

            // Assert
            Assert.NotNull(createdRoom);
            Assert.Equal(roomName, createdRoom.Name);
        }

        [Fact]
        public async Task CreateRoomAsync_ShouldNotAddRoom_WhenRoomExists()
        {
            // Arrange
            string roomName = "Existing Room";
            await _chatRepo.CreateRoomAsync(roomName); // Create the room first

            // Act
            await _chatRepo.CreateRoomAsync(roomName); // Attempt to create it again

            // Assert
            var rooms = await _chatRepo.GetAllRoomsAsync();
            Assert.Single(rooms.Where(r => r.Name == roomName)); // There should still be only one
        }
    }
}
