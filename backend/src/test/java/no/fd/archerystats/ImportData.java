package no.fd.archerystats;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import no.fd.archerystats.service.pojo.Round;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;

/**
 *
 * @author Kjetil
 */
public class ImportData {

    public static void main(String[] args) throws IOException {
        List<Round> rounds = new ArrayList<Round>();
        List<String> lines = FileUtils.readLines(new File("c:\\resultater_trening.csv"));
        for (String line : lines) {
            String[] split = line.split(",");
            Round round = new Round();
            round.setIdUser("43137106-8c92-4c35-83da-b62dca2e6449");
            round.setIdBow("6abfc406-c4f2-4acf-a9c2-bc35557f0170");
            round.setShootDate(getDate(split[1]));
            round.setRound(Integer.valueOf(split[9]));
            round.setMissScored(!split[6].equalsIgnoreCase("N"));
            round.setPerfectScored(!split[7].equalsIgnoreCase("N"));
            round.setBadshotScored(!split[8].equalsIgnoreCase("N"));
            round.setMiss(split[6].equalsIgnoreCase("N") ? null : Integer.valueOf(split[6]));
            round.setPerfect(split[7].equalsIgnoreCase("N") ? null : Integer.valueOf(split[7]));
            round.setBadShots(split[8].equalsIgnoreCase("N") ? null : Integer.valueOf(split[8]));
            round.setDistance(Integer.valueOf(split[2].replaceAll("m", "")));
            round.setHorizontalLeft(split[4] != null && !split[4].equals("") ? StringUtils.countMatches(split[4], "V") : null);
            round.setHorizontalCenter(split[4] != null && !split[4].equals("") ? StringUtils.countMatches(split[4], "X") : null);
            round.setHorizontalRight(split[4] != null && !split[4].equals("") ? StringUtils.countMatches(split[4], "H") : null);
            round.setVerticalHigh(split[5] != null && !split[5].equals("") ? StringUtils.countMatches(split[5], "O") : null);
            round.setVerticalCenter(split[5] != null && !split[5].equals("") ? StringUtils.countMatches(split[5], "X") : null);
            round.setVerticalLow(split[5] != null && !split[5].equals("") ? StringUtils.countMatches(split[5], "U") : null);
            rounds.add(round);
        }
        sendRequest(rounds);
    }

    private static Date getDate(String split) {
        Date date = new Date();
        date.setTime(0);
        date.setYear(118);
        date.setMonth(6);
        date.setDate(Integer.valueOf(split));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }

    private static void sendRequest(List<Round> rounds) throws MalformedURLException, IOException {
        URL url = new URL("http://localhost:8080/archerystats/request/rounds/import");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss.SSS").create();
        String object = gson.toJson(rounds);
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.write(object.getBytes());
        wr.flush();
        wr.close();    
        int responseCode = con.getResponseCode();
        System.out.println(responseCode);
    }

}
