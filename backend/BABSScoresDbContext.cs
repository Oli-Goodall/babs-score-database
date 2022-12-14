using System;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using BabsScoreDatabase.Models.Database;


namespace BabsScoreDatabase
{
    public class BABSScoresDbContext : DbContext
    {
        public DbSet<Chorus> Chorus { get; set; }
        public DbSet<Contest> Contest { get; set; }
        public DbSet<Quartet> Quartet { get; set; }
        public DbSet<ScoreSet> ScoreSet { get; set; }
        public DbSet<Song> Song { get; set; }
        public DbSet<Year> Year { get; set; }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder
        )
        {
            optionsBuilder.UseNpgsql(GetConnectionString());
        }

        private static string GetConnectionString()
        {
            var databaseUrl =
                "postgres://BABSScoreDB:BABSScores@localhost:5432/BABSScoreDB";
                // Environment.GetEnvironmentVariable("DATABASE_URL");
            if (databaseUrl == null)
            {
                throw new Exception("Environment variable 'DATABASE_URL' must not be null");
            }

            bool useSsl = true;
            var useSslVariable = "false"; 
            // Environment.GetEnvironmentVariable("USE_SSL");
            if (useSslVariable != null)
            {
                if (!Boolean.TryParse(useSslVariable, out useSsl))
                {
                    throw new Exception("Environment variable 'USE_SSL' must be parse-able as bool");
                }
            }

            var databaseUri = new Uri(databaseUrl);
            var userInfo = databaseUri.UserInfo.Split(':');

            var builder =
                new NpgsqlConnectionStringBuilder {
                    Host = databaseUri.Host,
                    Port = databaseUri.Port,
                    Username = userInfo[0],
                    Password = userInfo[1],
                    Database = databaseUri.LocalPath.TrimStart('/')
                };
            if (useSsl)
            {
                builder.SslMode = SslMode.Require;
                builder.TrustServerCertificate = true;
            }

            return builder.ToString();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
