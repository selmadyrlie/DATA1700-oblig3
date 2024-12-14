package webprog.obligs.data1700oblig3;



import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller {

    public final ArrayList<Billett> billettOversikt = new ArrayList<>();

    @PostMapping("/kjopBillett")
    public String kjop(@RequestBody Billett billett) {
        billettOversikt.add(billett);
        return "billett kjøpt";
    }

    @GetMapping("/hentOversikt")
    public ArrayList<Billett> hent() {
        return billettOversikt;
    }

    @DeleteMapping("/nullstill")
    public void nullstill() {
        billettOversikt.clear();
    }



}