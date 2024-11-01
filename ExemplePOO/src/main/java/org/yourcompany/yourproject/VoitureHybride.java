/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.yourcompany.yourproject;

/**
 *
 * @author dylan
 */
public class VoitureHybride extends Voiture {

    int electricite = 60;

    public VoitureHybride(String couleur, int vitesse) {
        super(couleur, vitesse);
    }

    @Override
    public void niveaux() {
        super.niveaux();
        System.out.println("Et " + electricite + "% de batterie");
    }

}
