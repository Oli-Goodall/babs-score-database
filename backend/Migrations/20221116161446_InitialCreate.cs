using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BabsScoreDatabase.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chorus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chorus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Quartet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quartet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Song",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Song", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Year",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContestYear = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Year", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScoreSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Mus = table.Column<int>(type: "integer", nullable: false),
                    Perf = table.Column<int>(type: "integer", nullable: false),
                    Sing = table.Column<int>(type: "integer", nullable: false),
                    QuartetId = table.Column<int>(type: "integer", nullable: true),
                    ChorusId = table.Column<int>(type: "integer", nullable: true),
                    SongId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScoreSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScoreSet_Chorus_ChorusId",
                        column: x => x.ChorusId,
                        principalTable: "Chorus",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ScoreSet_Quartet_QuartetId",
                        column: x => x.QuartetId,
                        principalTable: "Quartet",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ScoreSet_Song_SongId",
                        column: x => x.SongId,
                        principalTable: "Song",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Contest",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    ContestType = table.Column<int>(type: "integer", nullable: false),
                    YearId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contest_Year_YearId",
                        column: x => x.YearId,
                        principalTable: "Year",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contest_YearId",
                table: "Contest",
                column: "YearId");

            migrationBuilder.CreateIndex(
                name: "IX_ScoreSet_ChorusId",
                table: "ScoreSet",
                column: "ChorusId");

            migrationBuilder.CreateIndex(
                name: "IX_ScoreSet_QuartetId",
                table: "ScoreSet",
                column: "QuartetId");

            migrationBuilder.CreateIndex(
                name: "IX_ScoreSet_SongId",
                table: "ScoreSet",
                column: "SongId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contest");

            migrationBuilder.DropTable(
                name: "ScoreSet");

            migrationBuilder.DropTable(
                name: "Year");

            migrationBuilder.DropTable(
                name: "Chorus");

            migrationBuilder.DropTable(
                name: "Quartet");

            migrationBuilder.DropTable(
                name: "Song");
        }
    }
}
