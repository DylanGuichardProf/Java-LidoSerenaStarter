/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package org.yourcompany.yourproject;

/**
 *
 * @author dylan
 */
public class ExemplePOO {

    public static void main(String[] args) {

        Voiture v = new Voiture("bleu", 120);
        VoitureHybride vh = new VoitureHybride("rouge", 200);

        System.err.println("\n----------------------------------");
        System.err.println("------------ Voiture -------------");
        System.err.println("----------------------------------");
        System.err.println("Votre voiture est " + v.couleur);
        System.err.println("Elle va a " + v.vitesse + "km/h");
        v.roule();
        v.niveaux();

        System.err.println("\n\n----------------------------------");
        System.err.println("--------- VoitureHybride ---------");
        System.err.println("----------------------------------");
        System.err.println("Votre voiture est " + vh.couleur);
        System.err.println("Elle va a " + vh.vitesse + "km/h");
        System.err.println("Elle a " + vh.electricite + "% de batterie");
        vh.roule();
        vh.roule();
        vh.niveaux();
    }
}
