using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AsoApi.Models;

public partial class AsobdContext : DbContext
{
    public AsobdContext()
    {
    }

    public AsobdContext(DbContextOptions<AsobdContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Asociado> Asociados { get; set; }
   
    public virtual DbSet<Encargado> Encargados { get; set; }

    public virtual DbSet<Evento> Eventos { get; set; }

    public virtual DbSet<EventoAsociado> EventoAsociados { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       
    }   

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Asociado>(entity =>
        {
            entity.ToTable("Asociado");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Apellidos)
                .HasMaxLength(50)
                .IsFixedLength();
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsFixedLength();
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsFixedLength();
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsFixedLength();
        });

        modelBuilder.Entity<Encargado>(entity =>
        {
            entity.ToTable("Encargado");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Apellidos)
                .HasMaxLength(50)
                .IsFixedLength();
            entity.Property(e => e.Clave).HasMaxLength(50);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsFixedLength();
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsFixedLength();

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Encargados)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("FK_Encargado_Rol");
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.ToTable("Evento");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Direccion)
                .HasMaxLength(50)
                .IsFixedLength();
            entity.Property(e => e.Fecha).HasColumnType("date");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsFixedLength();
        });

        modelBuilder.Entity<EventoAsociado>(entity =>
        {
            entity.HasKey(e => new { e.IdEvento, e.IdAsociado });

            entity.ToTable("Evento_Asociado");

            entity.HasOne(d => d.IdAsociadoNavigation).WithMany(p => p.EventoAsociados)
                .HasForeignKey(d => d.IdAsociado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Evento_Asociado_Asociado");

            entity.HasOne(d => d.IdAsociado1).WithMany(p => p.EventoAsociados)
                .HasForeignKey(d => d.IdAsociado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Evento_Asociado_Evento");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.ToTable("Rol");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Nombre)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
