/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.yourcompany.yourproject;

/**
 *
 * @author dylan
 */
public class Voiture {

    String couleur = "grise";
    int vitesse = 150;
    int carburant = 50;

    public Voiture(String couleur, int vitesse) {
        this.couleur = couleur;
        this.vitesse = vitesse;
    }

    public void roule() {
        System.out.println("Votre voiture " + couleur + " fonce a " + vitesse + "km/h");
    }

    public void niveaux() {
        System.out.println("Il vous reste " + carburant + " litres de carburant");
    }
}
